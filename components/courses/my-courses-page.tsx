"use client"

import { useMemo, useState } from "react"
import { BookOpen, GraduationCap } from "lucide-react"
import { enrolledCourses, type EnrolledCourse } from "@/lib/courses-data"
import { CourseCard } from "@/components/courses/course-card"
import { AiSummaryModal } from "@/components/courses/ai-summary-modal"
import { cn } from "@/lib/utils"
import { getCourseBySlug, getAllLessons } from "@/lib/course-data"
import { useStudentProfile } from "@/hooks/use-student-profile"
import { computeLearningProgress } from "@/lib/progress"

type FilterKey = "all" | "AIML" | "Full Stack"

export function MyCoursesPage() {
  const [filter, setFilter] = useState<FilterKey>("all")
  const [summaryCourse, setSummaryCourse] = useState<EnrolledCourse | null>(null)
  const { profile } = useStudentProfile()

  const courses = useMemo(() => {
    const enrolled = new Set(profile.enrolledCourses)

    return enrolledCourses
      .filter((course) => enrolled.has(course.slug))
      .map((course) => {
        const fullCourse = getCourseBySlug(course.slug)
        const completedIds = profile.progress[course.slug]

        if (!fullCourse) return course

        const lessons = getAllLessons(fullCourse)
        const currentIndex = Math.min(completedIds?.length ?? 0, lessons.length - 1)
        const currentLesson = lessons[currentIndex]

        return {
          ...course,
          progress: computeLearningProgress(fullCourse, completedIds ?? [], profile.assignments),
          currentLesson: {
            title: currentLesson.title,
            description: currentLesson.notes,
            lessonNumber: currentIndex + 1,
          },
        }
      })
  }, [profile])

  const filtered = useMemo(() => {
    if (filter === "all") return courses
    return courses.filter((c) => c.category === filter)
  }, [courses, filter])

  const avgProgress = courses.length
    ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
    : 0

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All courses" },
    { key: "AIML", label: "AIML" },
    { key: "Full Stack", label: "Full Stack" },
  ]

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                My Courses
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Your enrolled AIML & full-stack learning paths
              </p>
            </div>
          </div>
          <p className="shrink-0 text-xs text-muted-foreground sm:text-right sm:text-sm">
            <span className="font-semibold text-foreground">{courses.length}</span>{" "}
            courses ·{" "}
            <span className="font-semibold text-foreground">{avgProgress}%</span> avg. progress
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatPill
          icon={GraduationCap}
          label="Enrolled"
          value={String(courses.length)}
        />
        <StatPill icon={BookOpen} label="Avg. progress" value={`${avgProgress}%`} />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
              filter === key
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/80 bg-card text-muted-foreground hover:border-primary/25 hover:bg-secondary hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} onAiSummary={setSummaryCourse} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No courses in this category yet.
        </p>
      )}

      <AiSummaryModal
        course={summaryCourse}
        open={!!summaryCourse}
        onClose={() => setSummaryCourse(null)}
      />
    </div>
  )
}

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-3.5 py-3 shadow-sm transition-colors hover:border-primary/15">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold tabular-nums tracking-tight">{value}</p>
      </div>
    </div>
  )
}
