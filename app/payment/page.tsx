"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PaymentFlow } from "@/components/payment-flow"

export default function PaymentPage() {
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

  const handlePaymentComplete = () => {
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
      <PaymentFlow userData={userData} onComplete={handlePaymentComplete} />
    </div>
  )
}
