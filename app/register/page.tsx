"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email && formData.phone && formData.nationality) {
      localStorage.setItem("cashpro_user", JSON.stringify(formData))
      router.push("/welcome")
    }
  }

  const handleLogin = () => {
    const userData = localStorage.getItem("cashpro_user")
    if (userData) {
      router.push("/code")
    } else {
      alert("Please register first to access your account.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/cashpro-logo.png" alt="CashPro Logo" width={120} height={120} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-lavender-900 mb-2">Join CashPro</h1>
          <p className="text-lavender-600">Start earning money by watching videos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="text-lavender-700 font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="mt-1 border-lavender-200 focus:border-lavender-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-lavender-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 border-lavender-200 focus:border-lavender-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-lavender-700 font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 border-lavender-200 focus:border-lavender-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <Label htmlFor="nationality" className="text-lavender-700 font-medium">
              Nationality
            </Label>
            <Select
              value={formData.nationality}
              onValueChange={(value) => setFormData({ ...formData, nationality: value })}
            >
              <SelectTrigger className="mt-1 border-lavender-200 focus:border-lavender-500">
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="ghana">Ghana</SelectItem>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="south-africa">South Africa</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-lavender-600 hover:bg-lavender-700 text-white py-3">
            Create Account
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleLogin}
            className="w-full border-lavender-300 text-lavender-600 hover:bg-lavender-50 bg-transparent"
          >
            Already have an account? Login
          </Button>
        </form>
      </div>
    </div>
  )
}
