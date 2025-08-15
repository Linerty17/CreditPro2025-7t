"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Mail } from "lucide-react"
import Image from "next/image"

interface ContactPageProps {
  onBack: () => void
}

export function ContactPage({ onBack }: ContactPageProps) {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/2349160594353", "_blank")
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Image src="/cashpro-logo.png" alt="CashPro Logo" width={48} height={48} className="rounded-full" />
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary">Contact Support</h1>
              <p className="text-muted-foreground">Get help with your CashPro account</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Support
              </CardTitle>
              <CardDescription>
                Get instant support through WhatsApp. Our team is available to help you with any questions or issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleWhatsAppContact} className="w-full bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp: 09160594353
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <Mail className="h-5 w-5" />
                Email Support
              </CardTitle>
              <CardDescription>
                Email support will be available soon. For now, please use WhatsApp for immediate assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-muted-foreground">Email support coming soon...</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
