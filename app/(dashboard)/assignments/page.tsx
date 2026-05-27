import { UpcomingAssignments } from "@/components/dashboard/upcoming-assignments"

export default function AssignmentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Assignments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track module-linked submissions, revision tasks, and project checkpoints.
        </p>
      </div>
      <UpcomingAssignments />
    </div>
  )
}
