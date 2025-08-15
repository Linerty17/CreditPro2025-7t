"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("cashpro-logged-in")
    const userData = localStorage.getItem("cashpro-user")

    if (isLoggedIn === "true") {
      router.push("/dashboard")
    } else if (userData) {
      router.push("/code")
    } else {
      router.push("/register")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading CashPro...</p>
      </div>
    </div>
  )
}
