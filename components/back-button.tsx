"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  onBack: () => void
  className?: string
  variant?: "default" | "ghost" | "outline"
}

export function BackButton({ onBack, className = "", variant = "ghost" }: BackButtonProps) {
  return (
    <Button
      variant={variant}
      size="sm"
      onClick={onBack}
      className={`flex items-center gap-2 text-foreground hover:text-accent-foreground hover:bg-accent transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
