"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
  const [balance, setBalance] = useState(5000)
  const [withdrawType, setWithdrawType] = useState<"bank" | "crypto">("bank")
  const [withdrawForm, setWithdrawForm] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
    walletAddress: "",
    cryptoType: "",
  })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isVideoPlaying) {
        const increments = [80, 125, 200, 100]
        const randomIncrement = increments[Math.floor(Math.random() * increments.length)]
        setBalance((prev) => prev + randomIncrement)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isVideoPlaying])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return

      if (event.data && typeof event.data === "string") {
        const data = JSON.parse(event.data)
        if (data.event === "video-progress") {
          setIsVideoPlaying(data.info?.playerState === 1)
        }
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    const handleIframeClick = () => {
      setIsVideoPlaying(true)
      setTimeout(() => {
        setIsVideoPlaying(false)
      }, 30000)
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.contentWindow?.addEventListener("click", handleIframeClick)
    }

    return () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.removeEventListener("click", handleIframeClick)
      }
    }
  }, [])

  const handleWithdraw = () => {
    const amount = Number(withdrawForm.amount)
    if (amount > balance) {
      alert("Insufficient balance")
      return
    }

    setBalance((prev) => prev - amount)

    const receipt = {
      id: Date.now().toString(),
      amount,
      type: withdrawType,
      date: new Date().toISOString(),
      status: "completed",
    }

    const receipts = JSON.parse(localStorage.getItem("cashpro_receipts") || "[]")
    receipts.push(receipt)
    localStorage.setItem("cashpro_receipts", JSON.stringify(receipts))

    alert(`Withdrawal of ₦${amount.toLocaleString()} successful!`)
    setWithdrawForm({
      accountNumber: "",
      accountName: "",
      bankName: "",
      amount: "",
      walletAddress: "",
      cryptoType: "",
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 rainbow-glow"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12">
              <img src="/cashpro-logo.png" alt="CashPro" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Hello, Valid User</h1>
          </div>
          <p className="text-lg text-white drop-shadow-lg">Good Day.</p>
        </div>

        <Card className="bg-green-500 text-white shadow-xl max-w-sm mx-auto border-2 border-white/20">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Available Balance</h2>
            <div className={`text-3xl font-bold ${isVideoPlaying ? "animate-pulse text-yellow-300" : ""}`}>
              ₦{balance.toLocaleString()}
            </div>
            <div className="text-sm mt-2 opacity-80">{isVideoPlaying ? "🎥 Earning..." : "⏸️ Paused"}</div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-4">Watch video to earn money</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl border-4 border-white/30"
                src="https://www.youtube.com/embed/TYNv2EunJhE?enablejsapi=1&origin=https://v0.app"
                title="Earning Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              />
            </div>
          </div>
          <p className="text-white drop-shadow-lg mt-4 text-lg">
            The more videos you watch the more your{" "}
            <span className="text-yellow-300 font-semibold animate-pulse">available balance</span> increase
          </p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl max-w-sm mx-auto border-2 border-white/30">
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
            className="bg-gray-800/80 backdrop-blur-sm text-white hover:bg-gray-700/80 px-8 py-3 rounded-full border-2 border-white/30"
          >
            <span className="mr-2">→</span> {withdrawType === "bank" ? "CRYPTO" : "BANK"}
          </Button>
        </div>
      </div>

      <style jsx>{`
        .rainbow-glow {
          background: linear-gradient(45deg, 
            #ff0000, #ff7f00, #ffff00, #00ff00, 
            #0000ff, #4b0082, #9400d3, #ff1493, 
            #00ffff, #ff69b4, #32cd32, #ffd700
          );
          background-size: 400% 400%;
          animation: rainbow-shift 3s ease infinite;
          filter: blur(50px);
          opacity: 0.8;
        }

        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
