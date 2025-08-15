"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import Image from "next/image"

export default function WelcomePage() {
  const router = useRouter()
  const [displayedText, setDisplayedText] = useState("")
  const [showButton, setShowButton] = useState(false)

  const welcomeText =
    "If you have been looking for where to earn money by just watching ads video's.\n\nThen you are at the right place, just get your (5) digit login code and you are good too go."

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < welcomeText.length) {
        setDisplayedText(welcomeText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowButton(true), 1000)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const handleContinue = () => {
    router.push("/code")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
        <button
          onClick={() => router.push("/register")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <Image src="/cashpro-logo.png" alt="CashPro Logo" width={80} height={80} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-500 mb-4">Welcome to CashPro</h1>
        </div>

        <div className="text-gray-700 text-center leading-relaxed mb-8 min-h-[120px]">
          {displayedText.split("\n").map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
        </div>

        {showButton && (
          <button
            onClick={handleContinue}
            className="w-full bg-lavender-600 hover:bg-lavender-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Continue to Login
          </button>
        )}
      </div>
    </div>
  )
}
