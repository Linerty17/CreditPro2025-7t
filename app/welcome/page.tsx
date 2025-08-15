"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { WelcomeModal } from "@/components/welcome-modal"

export default function WelcomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState<any>(null)
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    const returning = searchParams.get("returning") === "true"

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
      setIsReturningUser(returning)
    } else {
      router.push("/register")
    }
  }, [router, searchParams])

  const handleWelcomeComplete = () => {
    router.push("/code")
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
      <WelcomeModal userName={userData.fullName} onComplete={handleWelcomeComplete} isReturningUser={isReturningUser} />
    </div>
  )
}
