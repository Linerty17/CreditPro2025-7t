"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [step, setStep] = useState("details") // details, transfer, confirmation, success
  const [paymentData, setPaymentData] = useState({
    name: "",
    phone: "",
    amount: "6600",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("transfer")
  }

  const handlePaymentConfirm = () => {
    setStep("confirmation")
    setTimeout(() => {
      setStep("success")
    }, 3000)
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-2">Your access code is:</p>
          <div className="text-3xl font-bold text-lavender-600 mb-6 bg-lavender-50 py-3 rounded-lg">22334</div>
          <Button
            onClick={() => router.push("/code")}
            className="w-full bg-lavender-600 hover:bg-lavender-700 text-white"
          >
            Continue to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-lavender-600" />
          </button>
          <h1 className="text-xl font-bold text-lavender-900">Buy Your Passcode</h1>
        </div>

        {step === "details" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-gray-600 mb-6">
              Please provide your details, note that your passcode will be reviewed immediately your payment is
              completed
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name:</Label>
                <Input
                  id="name"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Number:</Label>
                <Input
                  id="phone"
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount:</Label>
                <Input id="amount" value="₦6,600" readOnly className="bg-gray-50" />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Submit
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                You have to make payment of ₦6,600 in order to be granted full access to the{" "}
                <span className="text-lavender-600 font-medium">CashPro</span> video earning app.
              </p>
              <p className="text-sm text-gray-600">
                Please note that you can withdraw back your ₦6,600 immediately you gain access to your dashboard.
              </p>
            </div>
          </div>
        )}

        {step === "transfer" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Bank Transfer</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Amount</span>
                <div className="flex items-center">
                  <span className="font-bold">₦6,600</span>
                  <Button variant="outline" size="sm" className="ml-2 text-xs bg-transparent">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Account Number</span>
                <div className="flex items-center">
                  <span className="font-bold text-blue-600">5569742889</span>
                  <Button variant="outline" size="sm" className="ml-2 text-xs bg-transparent">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Bank Name</span>
                <span className="font-bold">Moniepoint</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Account Name</span>
                <span className="font-bold">Fresh liberty 🗽</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">Pay to this specific account and get your access code</p>
            </div>

            <Button onClick={handlePaymentConfirm} className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white">
              I have made this bank transfer
            </Button>
          </div>
        )}

        {step === "confirmation" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-4">Wait while we confirm your payment...</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Payment Made</span>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span>Confirming Payment</span>
                <div className="w-5 h-5 border-2 border-orange-500 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
