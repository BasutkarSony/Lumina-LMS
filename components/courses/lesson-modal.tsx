"use client"

import Image from "next/image"
import { Play, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SimpleModal } from "@/components/courses/simple-modal"
import type { EnrolledCourse } from "@/lib/courses-data"

interface LessonModalProps {
  course: EnrolledCourse | null
  open: boolean
  onClose: () => void
}

export function LessonModal({ course, open, onClose }: LessonModalProps) {
  if (!course) return null

  const lessonProgress = Math.round(
    (course.currentLesson.lessonNumber / course.lessonCount) * 100
  )

  return (
    <SimpleModal
      open={open}
      onClose={onClose}
      title={course.currentLesson.title}
      description={course.title}
      className="sm:max-w-2xl"
    >
      <div className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          <Image
            src={course.coverImage}
            alt={course.imageAlt}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/30 to-transparent" />
          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Play className="h-6 w-6 fill-current pl-0.5" />
          </button>
          <span className="absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            Video preview
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {course.currentLesson.description}
        </p>

        <div className="space-y-2 rounded-lg border border-border/80 bg-secondary/30 p-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              Course progress
            </span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              Lesson {course.currentLesson.lessonNumber} of {course.lessonCount}
            </span>
          </div>
          <Progress value={lessonProgress} className="h-1.5" />
          <div className="flex justify-between gap-2 text-[11px] text-muted-foreground">
            <span>{lessonProgress}% through syllabus</span>
            <span className="tabular-nums">{course.progress}% overall complete</span>
          </div>
        </div>

        <Button className="h-10 w-full gap-2 shadow-sm transition-all hover:shadow-md active:scale-[0.99]">
          <span className="truncate">Next: {course.nextLessonTitle}</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </Button>
      </div>
    </SimpleModal>
  )
}
