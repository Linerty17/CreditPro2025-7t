"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Send } from "lucide-react"
import Image from "next/image"

interface CommunityPageProps {
  onBack: () => void
}

export function CommunityPage({ onBack }: CommunityPageProps) {
  const handleTelegramJoin = () => {
    window.open("https://t.me/CashProv6", "_blank")
  }

  const handleWhatsAppJoin = () => {
    window.open("https://chat.whatsapp.com/JzoLF2YSvOH5hqXvBEqBDJ?mode=ems_copy_t", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex flex-col items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute top-20 left-4 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex justify-center">
            <Image src="/cashpro-logo.png" alt="CashPro Logo" width={80} height={80} className="rounded-full" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-primary">Join Our Community</h1>
            <p className="text-muted-foreground text-center">
              Connect with other CashPro users, get updates, and share your earning journey!
            </p>
          </div>
        </div>

        {/* Community Options */}
        <div className="space-y-4">
          {/* Telegram Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-serif">Telegram Channel</CardTitle>
              <CardDescription>Get instant updates, tips, and connect with the CashPro community</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleTelegramJoin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3"
              >
                Join Telegram Channel
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-serif">WhatsApp Group</CardTitle>
              <CardDescription>Chat directly with other users and get real-time support</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleWhatsAppJoin}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3"
              >
                Join WhatsApp Group
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="bg-card/60 backdrop-blur-sm border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-center">Community Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Get earning tips and strategies</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Receive app updates first</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Connect with other earners</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Get support when needed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
