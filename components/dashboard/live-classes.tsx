"use client"

import { useState } from "react"
import { Video, Users, Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getReminderStates, toggleReminder } from "@/lib/engagement-storage"

const liveClasses = [
  {
    id: 1,
    title: "Deep Learning: Training Diagnostics",
    provider: "Provider: NPTEL",
    time: "Today, 3:00 PM",
    duration: "1.5 hours",
    students: 45,
    status: "live",
  },
  {
    id: 2,
    title: "NLP: Attention and Transformer Applications",
    provider: "Provider: Stanford Online",
    time: "Today, 5:30 PM",
    duration: "2 hours",
    students: 128,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Computer Vision: CNN Error Analysis",
    provider: "Provider: DeepLearning.AI",
    time: "Tomorrow, 10:00 AM",
    duration: "1 hour",
    students: 67,
    status: "upcoming",
  },
]

export function LiveClasses() {
  const [reminderStates, setReminderStates] = useState(() => getReminderStates())

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="dashboard-section-title">Live Classes</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-primary transition-colors hover:bg-primary/10"
        >
          View Schedule
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {liveClasses.map((liveClass) => (
          <div
            key={liveClass.id}
            className="interactive-card rounded-lg border border-border p-3 hover:bg-secondary/40"
          >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {liveClass.provider
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h4 className="text-sm font-medium leading-snug">{liveClass.title}</h4>
                    {liveClass.status === "live" && (
                      <Badge className="animate-pulse bg-destructive/90 px-1.5 py-0 text-[10px] text-destructive-foreground">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{liveClass.provider}</p>
                </div>
              </div>

              <Button
                size="sm"
                variant={liveClass.status === "live" ? "default" : "outline"}
                className="h-8 shrink-0 gap-1 self-start text-xs sm:self-center"
                onClick={() => {
                  if (liveClass.status !== "live") {
                    setReminderStates(toggleReminder(`live-${liveClass.id}`))
                  }
                }}
              >
                <Video className="h-3.5 w-3.5" />
                {liveClass.status === "live"
                  ? "Join Now"
                  : reminderStates[`live-${liveClass.id}`]
                    ? "Reminder Set"
                    : "Remind Me"}
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 shrink-0" />
                {liveClass.time}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 shrink-0" />
                {liveClass.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3 shrink-0" />
                {liveClass.students} enrolled
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
