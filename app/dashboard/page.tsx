"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"
import { Navigation } from "@/components/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const savedUserData = localStorage.getItem("cashpro-user")
    const isLoggedIn = localStorage.getItem("cashpro-logged-in")

    if (!savedUserData || isLoggedIn !== "true") {
      router.push("/register")
      return
    }

    setUserData(JSON.parse(savedUserData))
  }, [router])

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
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
      <Navigation onNavigate={handleNavigate} currentState="dashboard" />
      <Dashboard userData={userData} />
    </div>
  )
}
