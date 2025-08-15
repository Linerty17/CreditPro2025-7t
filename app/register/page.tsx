"use client"

import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      <RegistrationForm
        onComplete={(userData) => {
          localStorage.setItem("cashpro-user", JSON.stringify(userData))
          window.location.href = "/welcome"
        }}
      />
    </div>
  )
}
