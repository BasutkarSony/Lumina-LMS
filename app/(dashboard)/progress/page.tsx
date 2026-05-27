import { StatsCards } from "@/components/dashboard/stats-cards"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { RecentLessons } from "@/components/dashboard/recent-lessons"

export default function ProgressPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor lesson completion, streaks, and next learning actions.
        </p>
      </div>
      <StatsCards />
      <div className="grid gap-4 lg:grid-cols-2">
        <ContinueLearning />
        <RecentLessons />
      </div>
    </div>
  )
}
