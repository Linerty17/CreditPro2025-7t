"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WelcomeModal } from "@/components/welcome-modal"

export default function WelcomePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData)
      setUserData(parsedData)

      const isLoggedIn = localStorage.getItem("cashpro-logged-in")
      setIsReturningUser(isLoggedIn === "true")
    } else {
      router.push("/register")
    }
  }, [router])

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
