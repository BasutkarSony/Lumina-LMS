import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { UpcomingAssignments } from "@/components/dashboard/upcoming-assignments"
import { LiveClasses } from "@/components/dashboard/live-classes"
import { AIAssistant } from "@/components/dashboard/ai-assistant"
import { RecentLessons } from "@/components/dashboard/recent-lessons"
import { MobileInsights } from "@/components/dashboard/mobile-insights"

export function DashboardHome() {
  return (
    <div className="space-y-5">
      <WelcomeBanner />
      <StatsCards />
      <MobileInsights />
      <div className="grid gap-4 lg:grid-cols-2">
        <ContinueLearning />
        <UpcomingAssignments />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <LiveClasses />
        </div>
        <AIAssistant />
      </div>
      <RecentLessons />
    </div>
  )
}
