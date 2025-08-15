"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, LogOut } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(7468)
  const [withdrawalData, setWithdrawalData] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
  })
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("cashpro_user")
    const isLoggedIn = localStorage.getItem("cashpro_logged_in")

    if (!userData || isLoggedIn !== "true") {
      router.push("/register")
      return
    }

    setUser(JSON.parse(userData))

    // Simulate real-time balance increments
    const increments = [135, 210, 80, 95, 150, 75, 120]
    let currentIndex = 0

    const interval = setInterval(() => {
      setBalance((prev) => prev + increments[currentIndex % increments.length])
      currentIndex++
    }, 3000)

    return () => clearInterval(interval)
  }, [router])

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseInt(withdrawalData.amount)
    if (amount > balance) {
      alert("Insufficient balance")
      return
    }

    setBalance((prev) => prev - amount)
    alert(`Withdrawal of ₦${amount.toLocaleString()} successful!`)
    setWithdrawalData({ accountNumber: "", accountName: "", bankName: "", amount: "" })
  }

  const handleLogout = () => {
    localStorage.removeItem("cashpro_logged_in")
    router.push("/register")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-green-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <Image src="/cashpro-logo.png" alt="CashPro Logo" width={40} height={40} />
          <button onClick={handleLogout}>
            <LogOut className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Greeting */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Hello, Valid User</h1>
          <p className="text-white/80">Good Day.</p>
        </div>

        {/* Available Balance */}
        <div className="bg-green-500 rounded-2xl p-6 mb-6 shadow-lg">
          <p className="text-white text-sm mb-2">Available Balance</p>
          <p className="text-white text-3xl font-bold">₦{balance.toLocaleString()}</p>
        </div>

        {/* Video Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white text-center mb-4">Watch video to earn money</h2>
          <div className="bg-black rounded-lg overflow-hidden aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/TYNv2EunJhE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-center text-white mt-4">
            The more videos you watch the more your <span className="text-red-300 font-bold">available balance</span>{" "}
            increase
          </p>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <Label htmlFor="accountNumber" className="text-gray-700">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={withdrawalData.accountNumber}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, accountNumber: e.target.value })}
                className="border-b-2 border-gray-300 rounded-none border-t-0 border-l-0 border-r-0 focus:border-gray-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="accountName" className="text-gray-700">
                Account Name
              </Label>
              <Input
                id="accountName"
                value={withdrawalData.accountName}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, accountName: e.target.value })}
                className="border-b-2 border-gray-300 rounded-none border-t-0 border-l-0 border-r-0 focus:border-gray-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="bankName" className="text-gray-700">
                Bank Name
              </Label>
              <Input
                id="bankName"
                value={withdrawalData.bankName}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, bankName: e.target.value })}
                className="border-b-2 border-gray-300 rounded-none border-t-0 border-l-0 border-r-0 focus:border-gray-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-gray-700">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={withdrawalData.amount}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                className="border-b-2 border-gray-300 rounded-none border-t-0 border-l-0 border-r-0 focus:border-gray-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              Withdraw
            </Button>
          </form>
        </div>

        {/* Crypto Option */}
        <div className="mt-6 flex items-center justify-center">
          <div className="bg-gray-800 rounded-full p-3 flex items-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm">▶</span>
            </div>
            <span className="text-white font-bold">CRYPTO</span>
          </div>
        </div>
      </div>
    </div>
  )
}
