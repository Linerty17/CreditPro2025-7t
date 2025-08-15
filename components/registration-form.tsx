"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserData {
  fullName: string
  email: string
  phone: string
  nationality: string
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  "Brazil",
  "India",
  "Nigeria",
  "South Africa",
]

export function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isLoginMode) {
      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem("cashpro_users") || "[]")
      const user = existingUsers.find((u: UserData) => u.email === formData.email)

      if (user) {
        localStorage.setItem("cashpro-user", JSON.stringify(user))
        setIsLoading(false)
        router.push("/welcome")
      } else {
        setIsLoading(false)
        alert("User not found. Please register first.")
        setIsLoginMode(false)
        return
      }
    } else {
      // Registration logic
      const existingUsers = JSON.parse(localStorage.getItem("cashpro_users") || "[]")
      const userExists = existingUsers.find((u: UserData) => u.email === formData.email)

      if (userExists) {
        setIsLoading(false)
        alert("User already exists. Please login instead.")
        setIsLoginMode(true)
        return
      }

      existingUsers.push(formData)
      localStorage.setItem("cashpro_users", JSON.stringify(existingUsers))
      localStorage.setItem("cashpro-user", JSON.stringify(formData))
      setIsLoading(false)
      router.push("/welcome")
    }
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20">
            <img src="/cashpro-logo.png" alt="CashPro Logo" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-3xl font-serif bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            {isLoginMode ? "Welcome Back" : "Welcome to CashPro"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLoginMode ? "Login to continue earning" : "Join thousands earning money by watching videos"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {!isLoginMode && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-sm font-medium">
                    Nationality
                  </Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => handleInputChange("nationality", value)}
                  >
                    <SelectTrigger className="h-12 bg-input border-border">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={(!isLoginMode && !isFormValid) || (isLoginMode && !formData.email) || isLoading}
              className="w-full h-12 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading
                ? isLoginMode
                  ? "Logging in..."
                  : "Creating Account..."
                : isLoginMode
                  ? "Login"
                  : "Create Account"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
