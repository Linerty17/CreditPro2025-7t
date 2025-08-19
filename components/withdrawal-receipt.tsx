"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface WithdrawalReceiptProps {
  isOpen: boolean
  onClose: () => void
  receiptData: {
    amount: number
    refNumber: string
    paymentTime: string
    accountName: string
    accountNumber: string
    bankName: string
    type: "bank" | "crypto"
  }
}

export function WithdrawalReceipt({ isOpen, onClose, receiptData }: WithdrawalReceiptProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-md w-full mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-green-500">Payment Success!</h2>
            <div className="text-4xl font-bold text-black">₦{receiptData.amount.toLocaleString()}</div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-4">
            <h3 className="text-xl font-bold text-black text-center mb-4">Payment Details</h3>

            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Ref Number</span>
                <span className="text-black font-semibold">{receiptData.refNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Payment Time</span>
                <span className="text-black font-semibold">{receiptData.paymentTime}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Account Name</span>
                <span className="text-black font-semibold">{receiptData.accountName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Account Number</span>
                <span className="text-black font-semibold">{receiptData.accountNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Bank Name</span>
                <span className="text-black font-semibold">{receiptData.bankName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">From</span>
                <span className="text-black font-semibold">CashPro</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Payment status</span>
                <span className="text-black font-semibold">Success</span>
              </div>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-full text-lg"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
