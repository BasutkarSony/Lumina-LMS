"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen, Clock, Play, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { EnrolledCourse } from "@/lib/courses-data"
import {
  getCourseBySlug,
  getResumeLesson,
  getAllLessons,
} from "@/lib/course-data"

interface CourseCardProps {
  course: EnrolledCourse
  onAiSummary: (course: EnrolledCourse) => void
}

const difficultyStyles: Record<EnrolledCourse["difficulty"], string> = {
  Beginner: "bg-emerald-500/90 text-white border-0",
  Intermediate: "bg-cyan-600/90 text-white border-0",
  Advanced: "bg-indigo-600/90 text-white border-0",
}

const categoryStyles: Record<EnrolledCourse["category"], string> = {
  AIML: "bg-indigo-500/90 text-white border-0",
  "Full Stack": "bg-slate-600/90 text-white border-0",
}

export function CourseCard({ course, onAiSummary }: CourseCardProps) {
  const fullCourse = getCourseBySlug(course.slug)
  const defaultCompleted = fullCourse
    ? getAllLessons(fullCourse)
        .filter((l) => l.completed)
        .map((l) => l.id)
    : []
  const resumeLesson = fullCourse
    ? getResumeLesson(fullCourse, defaultCompleted)
    : null
  const lessonHref = resumeLesson
    ? `/courses/${course.slug}/lesson/${resumeLesson.id}`
    : `/courses/${course.slug}`
  const actionLabel = course.progress === 0 ? "Start Learning" : "Continue"

  return (
    <article className="course-card-lms group flex flex-col">
      <Link href={`/courses/${course.slug}`} className="block">
        <div className="relative aspect-[5/2] w-full overflow-hidden bg-muted">
          <Image
            src={course.coverImage}
            alt={course.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={course.progress > 80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/35 to-slate-900/10" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-2.5">
            <Badge
              className={cn("text-[10px] font-medium shadow-sm", categoryStyles[course.category])}
            >
              {course.category}
            </Badge>
            <Badge
              className={cn(
                "text-[10px] font-medium shadow-sm",
                difficultyStyles[course.difficulty]
              )}
            >
              {course.difficulty}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <Link href={`/courses/${course.slug}`} className="min-w-0 space-y-1 transition-opacity hover:opacity-90">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
            {course.title}
          </h3>
        </Link>

        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-1.5 py-0.5">
            <BookOpen className="h-3 w-3 shrink-0" />
            {course.lessonCount} lessons
          </span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 shrink-0" />
            {course.duration}
          </span>
        </div>

        <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-medium text-muted-foreground">Your progress</span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">
              {course.progress}%
            </span>
          </div>
          <Progress value={course.progress} className="h-1.5 bg-secondary" />
          <p className="line-clamp-1 text-[11px] leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground/80">Now:</span>{" "}
            {course.currentLesson.title}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
          <Button
            size="sm"
            className="h-9 w-full gap-1.5 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            asChild
          >
            <Link href={lessonHref}>
              <Play className="h-3.5 w-3.5 fill-current" />
              {actionLabel}
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-full gap-1.5 border-border/80 bg-card transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            onClick={(e) => {
              e.preventDefault()
              onAiSummary(course)
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Summary
          </Button>
        </div>
      </div>
    </article>
  )
}
