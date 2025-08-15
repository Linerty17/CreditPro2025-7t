"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CodePage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleNumberClick = (num: string) => {
    if (code.length < 5) {
      setCode(code + num)
    }
  }

  const handleClear = () => {
    setCode("")
  }

  const handleLogin = () => {
    if (code === "22334") {
      setShowSuccess(true)
      setTimeout(() => {
        localStorage.setItem("cashpro_logged_in", "true")
        router.push("/dashboard")
      }, 2000)
    } else {
      alert("Invalid code. Please try again.")
    }
  }

  const handleSignUp = () => {
    router.push("/payment")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-green-500 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            welcome
            <span className="inline-flex items-center ml-2 px-2 py-1 bg-green-500 text-white text-sm rounded">✓</span>!
          </h2>
          <p className="text-gray-600 mb-6">Login successful</p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white px-8 py-3 rounded-lg font-medium"
          >
            OK
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/cashpro-logo.png" alt="CashPro Logo" width={100} height={100} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome To</h1>
          <p className="text-lavender-500 font-medium mb-2">CashPro</p>
          <p className="text-gray-600">Enter (5) digit code</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <input
            type="text"
            value={code}
            readOnly
            className="w-full text-center text-2xl font-mono py-3 border-2 border-lavender-200 rounded-lg mb-6"
            placeholder="00000"
          />

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-lg text-xl font-semibold transition-colors"
              >
                {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button onClick={handleSignUp} variant="outline" className="text-red-500 border-red-200 bg-transparent">
              Sign Up
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
            <Button onClick={handleLogin} className="bg-green-600 hover:bg-green-700 text-white">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
