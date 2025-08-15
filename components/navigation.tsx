"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface NavigationProps {
  onNavigate: (page: "contact" | "about") => void
  currentState: string
}

export function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/cashpro-logo.png" alt="CashPro Logo" width={40} height={40} className="rounded-full" />
          <span className="font-serif text-xl font-bold text-primary">CashPro</span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("about")}
            className="text-muted-foreground hover:text-primary"
          >
            About
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("contact")}
            className="text-muted-foreground hover:text-primary"
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  )
}
