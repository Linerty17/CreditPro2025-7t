"use client"

import { useRouter } from "next/navigation"
import { ContactPage } from "@/components/contact-page"

export default function Contact() {
  const router = useRouter()

  const handleBack = () => {
    const isLoggedIn = localStorage.getItem("cashpro-logged-in")
    if (isLoggedIn === "true") {
      router.push("/dashboard")
    } else {
      router.push("/code")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      <ContactPage onBack={handleBack} />
    </div>
  )
}
