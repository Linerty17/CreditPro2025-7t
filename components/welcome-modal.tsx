"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface WelcomeModalProps {
  userName: string
  onComplete: () => void
  isReturningUser?: boolean
}

export function WelcomeModal({ userName, onComplete, isReturningUser }: WelcomeModalProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const welcomeText = isReturningUser
    ? `Welcome back to CashPro, ${userName}!\n\nReady to continue earning? Just enter your access code to get back to your dashboard.`
    : `Welcome to CashPro, ${userName}!\n\nIf you have been looking for where to earn money by just watching ads videos.\n\nThen you are at the right place, just get your (5) digit login code and you are good to go.`

  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + welcomeText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50) // Typewriter speed

      return () => clearTimeout(timer)
    } else {
      // Show button after text is complete
      setTimeout(() => setShowButton(true), 500)
    }
  }, [currentIndex, welcomeText])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-popover border border-border rounded-xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in-0 zoom-in-95 duration-300">
        <Button
          variant="ghost"
          size="icon"
          onClick={onComplete}
          className="absolute top-4 right-4 text-popover-foreground hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="text-center space-y-6">
          <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Welcome to CashPro
          </h1>

          <div className="text-popover-foreground leading-relaxed whitespace-pre-line min-h-[200px] text-left">
            {displayedText}
            <span className="animate-pulse">|</span>
          </div>

          {showButton && (
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground px-8 py-3 animate-in slide-in-from-bottom-4 duration-300"
            >
              Continue to Verification
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
