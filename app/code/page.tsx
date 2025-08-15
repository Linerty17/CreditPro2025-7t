"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CodeVerification } from "@/components/code-verification"
import { Navigation } from "@/components/navigation"

export default function CodePage() {
  const router = useRouter()
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    const isLoggedIn = localStorage.getItem("cashpro-logged-in")

    if (!savedUserData) {
      router.push("/register")
      return
    }

    setIsReturningUser(isLoggedIn === "true")
  }, [router])

  const handleCodeVerified = () => {
    localStorage.setItem("cashpro-logged-in", "true")
    router.push("/dashboard")
  }

  const handleSignUpFlow = () => {
    router.push("/payment")
  }

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      <Navigation onNavigate={handleNavigate} currentState="verification" />
      <CodeVerification onVerified={handleCodeVerified} onSignUp={handleSignUpFlow} isReturningUser={isReturningUser} />
    </div>
  )
}
