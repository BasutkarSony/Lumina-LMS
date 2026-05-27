"use client"

import { BookOpen, Clock, Trophy, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { enrolledCourses } from "@/lib/courses-data"
import { useStudentProfile } from "@/hooks/use-student-profile"

export function StatsCards() {
  const { profile } = useStudentProfile()
  const courses = enrolledCourses.filter((course) =>
    profile.enrolledCourses.includes(course.slug)
  )
  const completedLessons = Object.values(profile.progress).reduce(
    (sum, lessons) => sum + lessons.length,
    0
  )
  const certificatesReady = courses.filter((course) => course.progress >= 80).length
  const stats = [
    {
      label: "Courses Enrolled",
      value: String(courses.length),
      change: "active learning paths",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Lessons Completed",
      value: String(completedLessons),
      change: "tracked across courses",
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Certificates Ready",
      value: String(certificatesReady),
      change: "unlock at 80%",
      icon: Trophy,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      label: "Current Streak",
      value: String(profile?.streak?.current ?? 0),
      change: "days",
      icon: Flame,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="dashboard-card interactive-card border border-transparent">
          <CardContent className="!py-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tight tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.change}</p>
              </div>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
