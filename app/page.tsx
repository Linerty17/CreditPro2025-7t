"use client"

import { useState, useEffect } from "react"
import { RegistrationForm } from "@/components/registration-form"
import { WelcomeModal } from "@/components/welcome-modal"
import { CodeVerification } from "@/components/code-verification"
import { Dashboard } from "@/components/dashboard"
import { PaymentFlow } from "@/components/payment-flow"
import { ContactPage } from "@/components/contact-page"
import { AboutPage } from "@/components/about-page"
import { Navigation } from "@/components/navigation"

type AppState = "registration" | "welcome" | "verification" | "payment" | "dashboard" | "contact" | "about"

interface UserData {
  fullName: string
  email: string
  phone: string
  nationality: string
}

export default function CashProApp() {
  const [currentState, setCurrentState] = useState<AppState>("registration")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isReturningUser, setIsReturningUser] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState<AppState[]>([])

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData)
      setUserData(parsedData)
      setIsReturningUser(true)
      setCurrentState("verification")
      setNavigationHistory(["verification"])
    } else {
      setNavigationHistory(["registration"])
    }
  }, [])

  const navigateToState = (newState: AppState, addToHistory = true) => {
    if (addToHistory && currentState !== newState) {
      setNavigationHistory((prev) => [...prev, newState])
    }
    setCurrentState(newState)
  }

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory]
      newHistory.pop() // Remove current state
      const previousState = newHistory[newHistory.length - 1]
      setNavigationHistory(newHistory)
      setCurrentState(previousState)

      // Handle special cases for back navigation
      if (previousState === "welcome") {
        setShowWelcome(true)
      }
    }
  }

  const canGoBack = navigationHistory.length > 1

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data)
    localStorage.setItem("cashpro-user", JSON.stringify(data))
    setShowWelcome(true)
    navigateToState("welcome")
  }

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    navigateToState("verification")
  }

  const handleCodeVerified = () => {
    navigateToState("dashboard")
  }

  const handleSignUpFlow = () => {
    navigateToState("payment")
  }

  const handlePaymentComplete = () => {
    navigateToState("verification")
  }

  const handleNavigate = (page: AppState) => {
    navigateToState(page)
  }

  const handleBackToMain = () => {
    if (userData) {
      navigateToState("dashboard", false)
      setNavigationHistory(["dashboard"])
    } else {
      navigateToState("verification", false)
      setNavigationHistory(["verification"])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      {(currentState === "verification" || currentState === "dashboard") && (
        <Navigation onNavigate={handleNavigate} currentState={currentState} />
      )}

      {currentState === "registration" && <RegistrationForm onComplete={handleRegistrationComplete} />}

      {currentState === "welcome" && showWelcome && (
        <WelcomeModal
          userName={userData?.fullName || ""}
          onComplete={handleWelcomeComplete}
          isReturningUser={isReturningUser}
          onBack={canGoBack ? handleBack : undefined}
        />
      )}

      {currentState === "verification" && (
        <CodeVerification
          onVerified={handleCodeVerified}
          onSignUp={handleSignUpFlow}
          isReturningUser={isReturningUser}
          onBack={canGoBack ? handleBack : undefined}
        />
      )}

      {currentState === "payment" && userData && (
        <PaymentFlow
          userData={userData}
          onComplete={handlePaymentComplete}
          onBack={canGoBack ? handleBack : undefined}
        />
      )}

      {currentState === "dashboard" && userData && (
        <Dashboard userData={userData} onBack={canGoBack ? handleBack : undefined} />
      )}

      {currentState === "contact" && <ContactPage onBack={canGoBack ? handleBack : handleBackToMain} />}

      {currentState === "about" && <AboutPage onBack={canGoBack ? handleBack : handleBackToMain} />}
    </div>
  )
}
