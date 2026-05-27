"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStudentProfile } from "@/hooks/use-student-profile"

export function WelcomeBanner() {
  const { profile } = useStudentProfile()
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening"

  return (
    <div className="saas-gradient-banner relative overflow-hidden rounded-xl p-4 text-primary-foreground shadow-sm sm:p-5">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-medium opacity-90">Welcome back</span>
          </div>
          <h1 className="text-balance text-xl font-bold tracking-tight sm:text-2xl">
            {greeting}, {profile.name.split(" ")[0] || "learner"}
          </h1>
          <p className="max-w-md text-pretty text-xs opacity-90 sm:text-sm">
            Keep your streak alive with one lesson, one revision task, or one assignment
            checkpoint today.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-fit shrink-0 gap-1.5 border-0 bg-white/20 text-primary-foreground hover:bg-white/30"
        >
          Resume Learning
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
