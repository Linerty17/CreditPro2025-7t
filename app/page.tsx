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

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData)
      setUserData(parsedData)
      setIsReturningUser(true)
      setCurrentState("verification")
    }
  }, [])

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data)
    localStorage.setItem("cashpro-user", JSON.stringify(data))
    setShowWelcome(true)
    setCurrentState("welcome")
  }

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    setCurrentState("verification")
  }

  const handleCodeVerified = () => {
    setCurrentState("dashboard")
  }

  const handleSignUpFlow = () => {
    setCurrentState("payment")
  }

  const handlePaymentComplete = () => {
    setCurrentState("verification")
  }

  const handleNavigate = (page: AppState) => {
    setCurrentState(page)
  }

  const handleBackToMain = () => {
    if (userData) {
      setCurrentState("dashboard")
    } else {
      setCurrentState("verification")
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
        />
      )}

      {currentState === "verification" && (
        <CodeVerification
          onVerified={handleCodeVerified}
          onSignUp={handleSignUpFlow}
          isReturningUser={isReturningUser}
        />
      )}

      {currentState === "payment" && userData && <PaymentFlow userData={userData} onComplete={handlePaymentComplete} />}

      {currentState === "dashboard" && userData && <Dashboard userData={userData} />}

      {currentState === "contact" && <ContactPage onBack={handleBackToMain} />}

      {currentState === "about" && <AboutPage onBack={handleBackToMain} />}
    </div>
  )
}
