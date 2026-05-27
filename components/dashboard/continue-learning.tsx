"use client"

import Link from "next/link"
import { Play, Clock, BookMarked } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { enrolledCourses } from "@/lib/courses-data"
import { useStudentProfile } from "@/hooks/use-student-profile"

const colors = [
  "from-indigo-600 to-blue-700",
  "from-cyan-600 to-teal-700",
  "from-slate-600 to-indigo-700",
]

export function ContinueLearning() {
  const { profile } = useStudentProfile()
  const courses = enrolledCourses
    .filter((course) => profile.enrolledCourses.includes(course.slug))
    .slice(0, 3)

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="dashboard-section-title">Continue Learning</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-primary transition-colors hover:bg-primary/10"
          asChild
        >
          <Link href="/courses">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {courses.map((course, index) => {
          const completed = profile.progress[course.slug]?.length ?? 0
          const progress = completed > 0 ? Math.round((completed / course.lessonCount) * 100) : course.progress
          const label = progress === 0 ? "Start Learning" : "Continue"

          return (
            <div
              key={course.id}
              className="interactive-row group grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 p-2 sm:grid-cols-[4.5rem_minmax(0,1fr)_5.5rem]"
            >
              <div
                className={`relative flex h-[3.25rem] w-[4.5rem] shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${colors[index % colors.length]}`}
              >
                <BookMarked className="h-6 w-6 text-white/90" />
                <Link
                  href={`/courses/${course.slug}`}
                  className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <Play className="h-6 w-6 fill-white text-white" />
                </Link>
              </div>

              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-medium leading-snug">{course.title}</h4>
                  <p className="truncate text-xs text-muted-foreground">
                    {label}: {course.currentLesson.title}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="h-1 flex-1" />
                  <span className="w-8 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                    {progress}%
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden">
                  <Clock className="h-3 w-3 shrink-0" />
                  <span className="tabular-nums">{course.duration}</span>
                </div>
              </div>

              <div className="hidden items-center justify-end gap-1 text-xs text-muted-foreground sm:flex">
                <Clock className="h-3 w-3 shrink-0" />
                <span className="w-[4.75rem] text-right tabular-nums leading-none">
                  {course.duration}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
