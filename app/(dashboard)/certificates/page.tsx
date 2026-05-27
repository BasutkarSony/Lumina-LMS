import Link from "next/link"
import { Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { enrolledCourses } from "@/lib/courses-data"

export default function CertificatesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Certificates unlock inside each course at 80% completion.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="dashboard-card border border-border/60">
            <CardContent className="flex items-center justify-between gap-3 !py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{course.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {course.progress >= 80 ? "Ready to download" : `${course.progress}% complete`}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/courses/${course.slug}`}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
