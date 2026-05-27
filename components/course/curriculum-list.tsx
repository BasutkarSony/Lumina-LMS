"use client"

import Link from "next/link"
import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CourseDetail, CourseLesson } from "@/lib/course-data"
import { isLessonAccessible } from "@/lib/course-data"

interface CurriculumListProps {
  course: CourseDetail
  slug: string
  completedIds: string[]
  currentLessonId?: string
}

export function CurriculumList({
  course,
  slug,
  completedIds,
  currentLessonId,
}: CurriculumListProps) {
  return (
    <div className="space-y-4">
      {course.modules.map((module) => (
        <div key={module.id} className="rounded-xl border border-border/60 bg-card">
          <div className="border-b border-border/60 px-4 py-2.5">
            <h3 className="text-sm font-semibold text-foreground">
              {module.title}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {module.lessons.length} lessons
            </p>
          </div>
          <ul className="divide-y divide-border/50">
            {module.lessons.map((lesson) => {
              const completed = completedIds.includes(lesson.id)
              const accessible = isLessonAccessible(course, lesson.id, completedIds)
              const isCurrent = lesson.id === currentLessonId
              const locked = lesson.locked && !accessible && !completed

              return (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  slug={slug}
                  completed={completed}
                  locked={locked}
                  isCurrent={isCurrent}
                />
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

function LessonRow({
  lesson,
  slug,
  completed,
  locked,
  isCurrent,
}: {
  lesson: CourseLesson
  slug: string
  completed: boolean
  locked: boolean
  isCurrent: boolean
}) {
  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-chart-4" />
        ) : locked ? (
          <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
        ) : isCurrent ? (
          <PlayCircle className="h-4 w-4 text-primary" />
        ) : (
          <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            locked && "text-muted-foreground/60",
            isCurrent && "text-primary"
          )}
        >
          {lesson.title}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {lesson.duration} - Provider: {lesson.instructor}
        </p>
      </div>
      {isCurrent && (
        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          Current
        </span>
      )}
    </>
  )

  if (locked) {
    return (
      <li className="flex items-center gap-3 px-4 py-3 opacity-60">
        {content}
      </li>
    )
  }

  return (
    <li>
      <Link
        href={`/courses/${slug}/lesson/${lesson.id}`}
        className={cn(
          "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/60",
          isCurrent && "bg-primary/5"
        )}
      >
        {content}
      </Link>
    </li>
  )
}
