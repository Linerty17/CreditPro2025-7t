"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, DollarSign, Clock, Eye, LogOut, Wallet, TrendingUp } from "lucide-react"

interface UserData {
  fullName: string
  email: string
  phone: string
  nationality: string
}

interface DashboardProps {
  userData: UserData
}

interface Video {
  id: string
  title: string
  duration: string
  reward: number
  thumbnail: string
  watched: boolean
  category: string
}

export function Dashboard({ userData }: DashboardProps) {
  const [balance, setBalance] = useState(0)
  const [totalWatched, setTotalWatched] = useState(0)
  const [totalWatchTime, setTotalWatchTime] = useState(0)
  const [isWatching, setIsWatching] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [watchProgress, setWatchProgress] = useState(0)
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Latest Tech Product Review",
      duration: "2:30",
      reward: 0.25,
      thumbnail: "/placeholder-hmt2j.png",
      watched: false,
      category: "Technology",
    },
    {
      id: "2",
      title: "Amazing Travel Adventure",
      duration: "3:15",
      reward: 0.35,
      thumbnail: "/travel-adventure.png",
      watched: false,
      category: "Travel",
    },
    {
      id: "3",
      title: "Delicious Cooking Tutorial",
      duration: "4:00",
      reward: 0.5,
      thumbnail: "/cooking-tutorial.png",
      watched: false,
      category: "Food",
    },
    {
      id: "4",
      title: "Effective Fitness Workout",
      duration: "5:20",
      reward: 0.75,
      thumbnail: "/diverse-fitness-workout.png",
      watched: false,
      category: "Fitness",
    },
    {
      id: "5",
      title: "Business Success Tips",
      duration: "3:45",
      reward: 0.45,
      thumbnail: "/business-success-presentation.png",
      watched: false,
      category: "Business",
    },
    {
      id: "6",
      title: "Home Improvement DIY",
      duration: "6:10",
      reward: 0.85,
      thumbnail: "/placeholder-wlo89.png",
      watched: false,
      category: "Lifestyle",
    },
  ])

  const handleWatchVideo = (video: Video) => {
    setCurrentVideo(video)
    setIsWatching(true)
    setWatchProgress(0)

    // Simulate video watching progress
    const duration = Number.parseInt(video.duration.split(":")[0]) * 60 + Number.parseInt(video.duration.split(":")[1])
    const interval = setInterval(() => {
      setWatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          completeVideo(video)
          return 100
        }
        return prev + (100 / duration) * 2 // Update every 2 seconds
      })
    }, 2000)
  }

  const completeVideo = (video: Video) => {
    // Update video as watched
    setVideos((prev) => prev.map((v) => (v.id === video.id ? { ...v, watched: true } : v)))

    // Update stats
    setBalance((prev) => prev + video.reward)
    setTotalWatched((prev) => prev + 1)
    const duration = Number.parseInt(video.duration.split(":")[0]) * 60 + Number.parseInt(video.duration.split(":")[1])
    setTotalWatchTime((prev) => prev + duration)

    // Close modal after a short delay
    setTimeout(() => {
      setIsWatching(false)
      setCurrentVideo(null)
      setWatchProgress(0)
    }, 2000)
  }

  const formatWatchTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const availableVideos = videos.filter((v) => !v.watched)
  const watchedVideos = videos.filter((v) => v.watched)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/5">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-accent to-primary text-accent-foreground shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-serif">Welcome back, {userData.fullName}!</CardTitle>
                <p className="opacity-90 text-lg">Ready to earn some cash today?</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-4xl font-bold">${balance.toFixed(2)}</div>
                  <p className="text-sm opacity-90">Available Balance</p>
                </div>
                <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Eye className="w-10 h-10 mx-auto mb-3 text-accent" />
              <div className="text-3xl font-bold text-foreground">{totalWatched}</div>
              <p className="text-sm text-muted-foreground">Videos Watched</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-10 h-10 mx-auto mb-3 text-green-500" />
              <div className="text-3xl font-bold text-foreground">${balance.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 mx-auto mb-3 text-blue-500" />
              <div className="text-3xl font-bold text-foreground">{formatWatchTime(totalWatchTime)}</div>
              <p className="text-sm text-muted-foreground">Watch Time</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-purple-500" />
              <div className="text-3xl font-bold text-foreground">{availableVideos.length}</div>
              <p className="text-sm text-muted-foreground">Available Videos</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6"
            disabled={balance < 5}
          >
            <Wallet className="w-4 h-4 mr-2" />
            Withdraw ${balance.toFixed(2)}
          </Button>
          <Button variant="outline" className="px-6 bg-transparent">
            View Earnings History
          </Button>
        </div>

        {/* Available Videos */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Available Videos</CardTitle>
            <p className="text-muted-foreground">Watch videos to earn money instantly</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableVideos.map((video) => (
                <Card
                  key={video.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-16 h-16 text-white fill-white" />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white font-bold text-lg px-3 py-1">
                      +${video.reward}
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 left-3">
                      {video.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {video.duration}
                      </span>
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {video.reward}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleWatchVideo(video)}
                      className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-semibold py-2"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch & Earn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Watched Videos */}
        {watchedVideos.length > 0 && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Completed Videos</CardTitle>
              <p className="text-muted-foreground">Videos you've already watched</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchedVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden opacity-75">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-40 object-cover grayscale"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">Completed</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{video.title}</h3>
                      <p className="text-sm text-green-600 font-semibold">Earned: ${video.reward}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Video Watching Modal */}
      <Dialog open={isWatching} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{currentVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={currentVideo?.thumbnail || "/placeholder.svg"}
                alt={currentVideo?.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-2 fill-white" />
                  <p className="text-lg">Watching Video...</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(watchProgress)}%</span>
              </div>
              <Progress value={watchProgress} className="h-2" />
            </div>

            {watchProgress === 100 && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 font-semibold text-lg">
                  Congratulations! You earned ${currentVideo?.reward}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
