import { LiveClasses } from "@/components/dashboard/live-classes"

export default function LiveClassesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Live Classes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join active sessions and save reminders for upcoming provider-led classes.
        </p>
      </div>
      <LiveClasses />
    </div>
  )
}
