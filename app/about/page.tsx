"use client"

import { useRouter } from "next/navigation"
import { AboutPage } from "@/components/about-page"

export default function About() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/10">
      <AboutPage onBack={handleBack} />
    </div>
  )
}
