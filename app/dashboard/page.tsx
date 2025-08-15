"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [balance, setBalance] = useState(7468)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [bankName, setBankName] = useState("")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("cashpro-logged-in")
    const savedUserData = localStorage.getItem("cashpro-user")

    if (!isLoggedIn || !savedUserData) {
      router.push("/register")
      return
    }

    setUserData(JSON.parse(savedUserData))

    const interval = setInterval(() => {
      const increments = [135, 210, 80]
      const randomIncrement = increments[Math.floor(Math.random() * increments.length)]
      setBalance((prev) => prev + randomIncrement)
    }, 3000)

    return () => clearInterval(interval)
  }, [router])

  const handleWithdraw = () => {
    const amount = Number.parseInt(withdrawAmount)
    if (amount && amount <= balance) {
      setBalance((prev) => prev - amount)
      setWithdrawAmount("")
      setAccountNumber("")
      setAccountName("")
      setBankName("")
      alert(`Successfully withdrew ₦${amount.toLocaleString()}`)
    }
  }

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  if (!userData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-4">
      <Navigation onNavigate={handleNavigate} currentState="dashboard" />

      <div className="max-w-md mx-auto space-y-6 pt-20">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Hello, Valid User</h1>
          <p className="text-lg">Good Day.</p>
        </div>

        <Card className="bg-green-600 text-white border-none">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Available Balance</h2>
            <p className="text-3xl font-bold">₦{balance.toLocaleString()}</p>
          </CardContent>
        </Card>

        <div className="bg-black rounded-lg overflow-hidden">
          <h3 className="text-white text-center py-4 text-xl font-bold">Watch video to earn money</h3>
          <div className="aspect-video">
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
          <p className="text-white text-center py-4">
            The more videos you watch the more your <span className="text-red-500 font-bold">available balance</span>{" "}
            increase
          </p>
        </div>

        <Card className="bg-white">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="border-b-2 border-black rounded-none bg-transparent"
              />
            </div>
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="border-b-2 border-black rounded-none bg-transparent"
              />
            </div>
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="border-b-2 border-black rounded-none bg-transparent"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="border-b-2 border-black rounded-none bg-transparent"
              />
            </div>
            <Button
              onClick={handleWithdraw}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              Withdraw
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
