"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { WithdrawalReceipt } from "./withdrawal-receipt"

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
  const [withdrawType, setWithdrawType] = useState<"bank" | "crypto">("bank")
  const [withdrawForm, setWithdrawForm] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
    walletAddress: "",
    cryptoType: "",
  })
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)

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

    const refNumber = Math.floor(Math.random() * 90000000) + 10000000
    const now = new Date()
    const paymentTime =
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " " +
      now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })

    const receipt = {
      amount,
      refNumber: refNumber.toString(),
      paymentTime,
      accountName: withdrawForm.accountName || "N/A",
      accountNumber: withdrawForm.accountNumber || withdrawForm.walletAddress || "N/A",
      bankName: withdrawForm.bankName || withdrawForm.cryptoType || "N/A",
      type: withdrawType,
      date: new Date().toISOString(),
      status: "completed",
    }

    setReceiptData(receipt)
    setShowReceipt(true)

    // Save to localStorage
    const receipts = JSON.parse(localStorage.getItem("cashpro_receipts") || "[]")
    receipts.push(receipt)
    localStorage.setItem("cashpro_receipts", JSON.stringify(receipts))

    setWithdrawForm({
      accountNumber: "",
      accountName: "",
      bankName: "",
      amount: "",
      walletAddress: "",
      cryptoType: "",
    })
  }

  const closeReceipt = () => {
    setShowReceipt(false)
    setReceiptData(null)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 rainbow-glow-bg"></div>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12">
              <img src="/cashpro-logo.png" alt="CashPro" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, {userData.fullName}</h1>
          </div>
          <p className="text-lg text-gray-700">Good Day.</p>
        </div>

        <Card className="bg-green-500 text-white shadow-xl max-w-sm mx-auto">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Available Balance</h2>
            <div className="text-3xl font-bold">₦{balance.toLocaleString()}</div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Watch video to earn money</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
                src="https://www.youtube.com/embed/UyXyING7JKI"
                title="Earning Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-gray-700 mt-4 text-lg">
            The more videos you watch the more your{" "}
            <span className="text-red-500 font-semibold">available balance</span> increase
          </p>
        </div>

        <Card className="bg-white shadow-xl max-w-sm mx-auto">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              {withdrawType === "bank" ? (
                <>
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
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Crypto Type</label>
                    <Select
                      value={withdrawForm.cryptoType}
                      onValueChange={(value) => setWithdrawForm((prev) => ({ ...prev, cryptoType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="---SELECT CRYPTO TYPE ---" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bitcoin">Bitcoin</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                    <Input
                      placeholder="Wallet Address"
                      value={withdrawForm.walletAddress}
                      onChange={(e) => setWithdrawForm((prev) => ({ ...prev, walletAddress: e.target.value }))}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount in NGN</label>
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
            >
              Withdraw
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setWithdrawType(withdrawType === "bank" ? "crypto" : "bank")}
            variant="outline"
            className="bg-gray-800 text-white hover:bg-gray-700 px-8 py-3 rounded-full"
          >
            <span className="mr-2">→</span> {withdrawType === "bank" ? "CRYPTO" : "BANK"}
          </Button>
        </div>
      </div>

      {receiptData && <WithdrawalReceipt isOpen={showReceipt} onClose={closeReceipt} receiptData={receiptData} />}

      <style jsx>{`
        .rainbow-glow-bg {
          background: linear-gradient(45deg, 
            #ff0000, #ff7f00, #ffff00, #00ff00, 
            #0000ff, #4b0082, #9400d3, #ff1493, 
            #00ffff, #ff69b4, #32cd32, #ffd700
          );
          background-size: 400% 400%;
          animation: rainbowGlow 3s ease-in-out infinite;
          filter: blur(50px);
          opacity: 0.8;
        }
        
        @keyframes rainbowGlow {
          0% {
            background-position: 0% 50%;
            filter: blur(50px) brightness(1.2);
          }
          25% {
            background-position: 100% 50%;
            filter: blur(40px) brightness(1.5);
          }
          50% {
            background-position: 100% 100%;
            filter: blur(60px) brightness(1.1);
          }
          75% {
            background-position: 0% 100%;
            filter: blur(45px) brightness(1.4);
          }
          100% {
            background-position: 0% 50%;
            filter: blur(50px) brightness(1.2);
          }
        }
      `}</style>
    </div>
  )
}
