"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CashProApp() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("cashpro_logged_in")
    const savedUserData = localStorage.getItem("cashpro_user")

    if (isLoggedIn === "true" && savedUserData) {
      // User is logged in, redirect to dashboard
      router.push("/dashboard")
    } else if (savedUserData) {
      // User is registered but not logged in, redirect to code page
      router.push("/code")
    } else {
      // New user, redirect to registration
      router.push("/register")
    }
  }, [router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-500 mx-auto mb-4"></div>
        <p className="text-lavender-600">Loading CashPro...</p>
      </div>
    </div>
  )
}
