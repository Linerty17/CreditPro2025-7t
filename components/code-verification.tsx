"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Play, DollarSign } from "lucide-react"

interface CodeVerificationProps {
  onVerified: () => void
  onSignUp: () => void
  isReturningUser?: boolean
}

export function CodeVerification({ onVerified, onSignUp, isReturningUser }: CodeVerificationProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleNumberClick = (num: string) => {
    if (code.length < 5) {
      setCode((prev) => prev + num)
    }
  }

  const handleClear = () => {
    setCode("")
  }

  const handleLogin = async () => {
    if (code.length === 5) {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (code === "200717") {
        setIsLoading(false)
        onVerified()
      } else {
        setIsLoading(false)
        alert("Invalid code. Please try again or purchase an access code.")
        setCode("")
      }
    }
  }

  const handleSignUp = () => {
    onSignUp()
  }

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-6 pb-4">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg p-2 -mx-6 -mt-6 mb-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <span className="text-lg">×</span>
            </Button>
            <div className="flex gap-4">
              <span className="text-white font-medium">HOME</span>
              <span className="text-white font-medium">ABOUT</span>
              <span className="text-white font-medium">CONTACT</span>
            </div>
          </div>

          {/* Logo */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center relative">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-pink-500" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-60"></div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Welcome To</h1>
            <h2 className="text-xl text-pink-400 font-medium">CashPro</h2>
            <p className="text-foreground font-medium">
              {isReturningUser ? "Enter your access code" : "Enter (5) digit code"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Code Input */}
          <div className="relative">
            <Input
              type="text"
              value={code}
              readOnly
              placeholder="Enter 5-digit code"
              className="h-12 text-center text-lg font-mono tracking-widest bg-input border-2 border-purple-200 rounded-full"
              maxLength={5}
            />
          </div>

          {/* Number Keypad */}
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((num) => (
              <Button
                key={num}
                variant="outline"
                onClick={() => handleNumberClick(num)}
                className="h-16 text-xl font-bold border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
              >
                {num}
              </Button>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={handleSignUp}
              className="h-16 text-red-600 font-bold border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 bg-transparent"
            >
              Sign Up
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              className="h-16 font-bold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 bg-transparent"
            >
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={handleLogin}
              disabled={code.length !== 5 || isLoading}
              className="h-16 text-green-600 font-bold border-2 border-gray-300 hover:border-green-400 hover:bg-green-50 disabled:opacity-50 bg-transparent"
            >
              {isLoading ? "..." : "Login"}
            </Button>
          </div>

          {/* Gradient Buttons */}
          <div className="space-y-3 pt-4">
            <Button className="w-full h-12 bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500 text-white font-medium rounded-full shadow-lg transform hover:scale-[1.02] transition-all duration-200">
              SignUp with Crypto
            </Button>
            <Button className="w-full h-12 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-medium rounded-full shadow-lg transform hover:scale-[1.02] transition-all duration-200">
              Other Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
