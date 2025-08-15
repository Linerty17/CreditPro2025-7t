"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface UserData {
  fullName: string
  email: string
  phone: string
  nationality: string
}

interface DashboardProps {
  userData: UserData
}

export function Dashboard({ userData }: DashboardProps) {
  const [balance, setBalance] = useState(7468)
  const [withdrawForm, setWithdrawForm] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const increments = [135, 210, 80, 95, 150, 175, 120, 200]
      const randomIncrement = increments[Math.floor(Math.random() * increments.length)]
      setBalance((prev) => prev + randomIncrement)
    }, 3000) // Every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const handleWithdraw = () => {
    const amount = Number(withdrawForm.amount)
    if (amount > balance) {
      alert("Insufficient balance")
      return
    }

    setBalance((prev) => prev - amount)

    // Generate receipt (simplified)
    const receipt = {
      id: Date.now().toString(),
      amount,
      date: new Date().toISOString(),
      status: "completed",
    }

    // Save to localStorage
    const receipts = JSON.parse(localStorage.getItem("cashpro_receipts") || "[]")
    receipts.push(receipt)
    localStorage.setItem("cashpro_receipts", JSON.stringify(receipts))

    alert(`Withdrawal of ₦${amount.toLocaleString()} successful!`)
    setWithdrawForm({
      accountNumber: "",
      accountName: "",
      bankName: "",
      amount: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-green-300 to-purple-600">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12">
              <img src="/cashpro-logo.png" alt="CashPro" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, Valid User</h1>
          </div>
          <p className="text-lg text-gray-700">Good Day.</p>
        </div>

        <Card className="bg-green-500 text-white shadow-xl max-w-sm mx-auto">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Available Balance</h2>
            <div className="text-3xl font-bold">₦{balance.toLocaleString()}</div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-black">Watch video to earn money</h2>

          <div className="max-w-2xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/TYNv2EunJhE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <p className="text-black font-medium">
            The more videos you watch the more your <span className="text-red-500 font-bold">available balance</span>{" "}
            increase
          </p>
        </div>

        <Card className="bg-white shadow-xl max-w-sm mx-auto">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <Input
                  placeholder="Account Number"
                  value={withdrawForm.accountNumber}
                  onChange={(e) => setWithdrawForm((prev) => ({ ...prev, accountNumber: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                <Input
                  placeholder="Account Name"
                  value={withdrawForm.accountName}
                  onChange={(e) => setWithdrawForm((prev) => ({ ...prev, accountName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <Input
                  placeholder="Bank Name"
                  value={withdrawForm.bankName}
                  onChange={(e) => setWithdrawForm((prev) => ({ ...prev, bankName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <Input
                  placeholder="Amount in NGN"
                  type="number"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm((prev) => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3"
              disabled={
                !withdrawForm.accountNumber ||
                !withdrawForm.accountName ||
                !withdrawForm.bankName ||
                !withdrawForm.amount
              }
            >
              Withdraw
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 px-8 py-3 rounded-full">
            <span className="mr-2">→</span> CRYPTO
          </Button>
        </div>
      </div>
    </div>
  )
}
