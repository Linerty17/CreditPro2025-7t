"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, DollarSign, Shield, Users } from "lucide-react"
import Image from "next/image"

interface AboutPageProps {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Image src="/cashpro-logo.png" alt="CashPro Logo" width={48} height={48} className="rounded-full" />
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary">About CashPro</h1>
              <p className="text-muted-foreground">Home of Wealth</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-primary text-xl">Welcome to CashPro</CardTitle>
              <CardDescription className="text-base">
                Your gateway to earning money through video engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                CashPro is a revolutionary platform that allows you to earn money simply by watching videos. We've
                created an ecosystem where your time and attention are rewarded with real cash that you can withdraw
                instantly.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Play className="h-5 w-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <p>Register your account with basic information</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <p>Purchase your access code for ₦6,600</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <p>Watch videos and earn money for each view</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <p>Withdraw your earnings instantly</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <DollarSign className="h-5 w-5" />
                  Earning Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Per Video:</span>
                    <span className="font-semibold">₦50 - ₦200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Potential:</span>
                    <span className="font-semibold">₦2,000 - ₦8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Potential:</span>
                    <span className="font-semibold">₦60,000 - ₦240,000</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Earnings depend on video length, engagement, and daily activity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Shield className="h-5 w-5" />
                  Security & Trust
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>✓ Secure payment processing</p>
                  <p>✓ Instant withdrawal system</p>
                  <p>✓ 24/7 customer support</p>
                  <p>✓ Transparent earning system</p>
                  <p>✓ No hidden fees or charges</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Users className="h-5 w-5" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Join thousands of users already earning with CashPro</p>
                  <p>Connect with fellow earners</p>
                  <p>Share tips and strategies</p>
                  <p>Get support from our community</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Why Choose CashPro?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                CashPro stands out as the premier video earning platform in Nigeria. We offer competitive rates, instant
                payments, and a user-friendly interface that makes earning money as simple as watching your favorite
                content. Our commitment to transparency and user satisfaction has made us the trusted choice for
                thousands of users looking to supplement their income through digital engagement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
