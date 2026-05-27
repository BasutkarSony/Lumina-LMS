"use client"

import { useState } from "react"
import { Target, Calendar, Clock, Zap, CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getReminderStates, toggleReminder } from "@/lib/engagement-storage"
import { useStudentProfile } from "@/hooks/use-student-profile"

const dailyGoals = [
  { id: 1, text: "Complete 2 lessons", completed: true, progress: 100 },
  { id: 2, text: "Study for 30 minutes", completed: true, progress: 100 },
  { id: 3, text: "Review one assignment brief", completed: false, progress: 0 },
  { id: 4, text: "Watch live class", completed: false, progress: 0 },
]

const reminders = [
  { id: 1, text: "Deep Learning lab at 4 PM", time: "2 hours" },
  { id: 2, text: "Submit React course module", time: "Tomorrow" },
  { id: 3, text: "Review NLP feedback", time: "Friday" },
]

const deadlines = [
  { id: 1, title: "Training Diagnostics Case Study", date: "Tomorrow", urgent: true },
  { id: 2, title: "Transformer Attention Visualization", date: "May 28", urgent: false },
  { id: 3, title: "CNN Error Analysis Report", date: "June 1", urgent: false },
]

export function RightSidebar() {
  const { profile } = useStudentProfile()
  const [reminderStates, setReminderStates] = useState(() => getReminderStates())
  const completedGoals = dailyGoals.filter((g) => g.completed).length
  const goalProgress = (completedGoals / dailyGoals.length) * 100

  return (
    <aside className="dashboard-panel-scroll hidden w-72 shrink-0 flex-col gap-3 overflow-y-auto overscroll-contain border-l border-border/80 bg-card/50 p-3 xl:sticky xl:top-14 xl:flex xl:max-h-[calc(100vh-3.5rem)]">
      <Card className="dashboard-card">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-primary" />
            Daily Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium tabular-nums">
                {completedGoals}/{dailyGoals.length}
              </span>
            </div>
            <Progress value={goalProgress} className="h-1.5" />
          </div>

          <div className="space-y-1.5">
            {dailyGoals.map((goal) => (
              <div key={goal.id} className="flex items-center gap-2 text-xs">
                {goal.completed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-chart-4" />
                ) : (
                  <Circle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className={goal.completed ? "text-muted-foreground line-through" : ""}>
                  {goal.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-start justify-between gap-2 border-b border-border py-2 last:border-0"
            >
              <button
                type="button"
                className={`min-w-0 flex-1 text-left text-xs leading-snug ${
                  reminderStates[String(reminder.id)] ? "text-muted-foreground line-through" : ""
                }`}
                onClick={() => setReminderStates(toggleReminder(String(reminder.id)))}
              >
                {reminder.text}
              </button>
              <span className="flex shrink-0 items-center gap-1 text-[11px] tabular-nums text-muted-foreground">
                <Clock className="h-3 w-3" />
                {reminder.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-chart-5" />
            Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 ${
                deadline.urgent ? "bg-destructive/10" : "bg-secondary/80"
              }`}
            >
              <span className="min-w-0 flex-1 truncate text-xs font-medium">
                {deadline.title}
              </span>
              <span
                className={`shrink-0 text-[11px] tabular-nums ${
                  deadline.urgent ? "font-medium text-destructive" : "text-muted-foreground"
                }`}
              >
                {deadline.date}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="dashboard-card bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <CardContent className="!px-3.5 !py-3">
          <div className="flex items-start gap-2.5">
            <div className="rounded-md bg-primary/10 p-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-snug">Keep it up!</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                You&apos;re on a {profile?.streak?.current ?? 0}-day streak. Complete one activity to
                protect your weekly goal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
