"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"

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

type PaymentStep = "details" | "transfer" | "confirmation" | "success"

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

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setCurrentStep("success")
    setIsProcessing(false)
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleBackToVerification = () => {
    onComplete()
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
                  <span className="font-bold text-blue-600 underline">5569742889</span>
                  <Button
                    size="sm"
                    className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 text-xs"
                    onClick={() => handleCopyToClipboard("5569742889")}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Bank Name</span>
                <span className="font-bold">Moniepoint</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Account Name</span>
                <span className="font-bold">Fresh liberty 🗽</span>
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
                <div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">NGN 6,600</div>
                    <div className="text-sm text-muted-foreground">{userData.email}</div>
                  </div>
                </div>
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

  if (currentStep === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Payment Confirmed!</h2>
              <p className="text-muted-foreground">Your access code has been generated</p>

              <div className="bg-gradient-to-r from-accent to-primary p-6 rounded-lg">
                <p className="text-accent-foreground font-medium mb-2">Your Access Code:</p>
                <div className="text-4xl font-bold text-accent-foreground font-mono tracking-widest">200717</div>
              </div>

              <p className="text-sm text-muted-foreground">
                Use this code to access your CashPro dashboard and start earning!
              </p>
            </div>

            <Button
              onClick={handleBackToVerification}
              className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-medium py-3"
            >
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
