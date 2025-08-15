"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CodeVerification } from "@/components/code-verification"
import { Navigation } from "@/components/navigation"

export default function CodePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
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
    router.push(`/${page}`)
  }

  if (!userData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      <Navigation onNavigate={handleNavigate} currentState="verification" />
      <CodeVerification onVerified={handleCodeVerified} onSignUp={handleSignUpFlow} isReturningUser={true} />
    </div>
  )
}
