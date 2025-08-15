"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CodeVerification } from "@/components/code-verification"
import { Navigation } from "@/components/navigation"

export default function CodePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
      setIsReturningUser(true)
    } else {
      router.push("/register")
    }
  }, [router])

  const handleCodeVerified = () => {
    localStorage.setItem("cashpro-logged-in", "true")
    router.push("/dashboard")
  }

  const handleSignUpFlow = () => {
    router.push("/payment")
  }

  const handleNavigate = (page: string) => {
    if (page === "contact") router.push("/contact")
    if (page === "about") router.push("/about")
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      <Navigation onNavigate={handleNavigate} currentState="verification" />
      <CodeVerification onVerified={handleCodeVerified} onSignUp={handleSignUpFlow} isReturningUser={isReturningUser} />
    </div>
  )
}
