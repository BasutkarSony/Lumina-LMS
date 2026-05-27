"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  Play,
  Sparkles,
  Users,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CurriculumList } from "@/components/course/curriculum-list"
import { CourseAssignments } from "@/components/course/course-assignments"
import { CourseCertificate } from "@/components/course/course-certificate"
import { CourseAiPanel } from "@/components/course/course-ai-panel"
import { AiSummaryModal } from "@/components/courses/ai-summary-modal"
import {
  getLiveClassUrl,
  getResumeLesson,
  getAllLessons,
  type CourseDetail,
} from "@/lib/course-data"
import { getCompletedLessonIds } from "@/lib/progress-storage"
import { enrolledCourses } from "@/lib/courses-data"
import { getAssignmentProgress } from "@/lib/assignment-storage"
import { computeLearningProgress } from "@/lib/progress"
interface CourseDetailPageProps {
  course: CourseDetail
}

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([])
  const [assignmentProgress, setAssignmentProgress] = useState(() => getAssignmentProgress())
  const [showAi, setShowAi] = useState(false)

  useEffect(() => {
    const stored = getCompletedLessonIds(course.slug)
    if (stored.length > 0) {
      setCompletedIds(stored)
    } else {
      const defaults = getAllLessons(course)
        .filter((l) => l.completed)
        .map((l) => l.id)
      setCompletedIds(defaults)
    }
  }, [course])

  const progress = useMemo(
    () => computeLearningProgress(course, completedIds, assignmentProgress),
    [course, completedIds, assignmentProgress]
  )

  const resumeLesson = useMemo(
    () => getResumeLesson(course, completedIds),
    [course, completedIds]
  )

  const enrolled = enrolledCourses.find((c) => c.slug === course.slug)

  const aiModalCourse = enrolled
    ? {
        ...enrolled,
        progress,
        currentLesson: {
          title: resumeLesson.title,
          description: resumeLesson.notes,
          lessonNumber: getAllLessons(course).findIndex((l) => l.id === resumeLesson.id) + 1,
        },
      }
    : null

  return (
    <div className="space-y-6">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to My Courses
      </Link>

      <section className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="relative aspect-[21/7] max-h-48 w-full sm:max-h-56">
          <Image
            src={course.coverImage}
            alt={course.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/20" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="mb-2 flex flex-wrap gap-1.5">
              <Badge className="bg-indigo-500/90 text-white border-0">{course.category}</Badge>
              <Badge className="bg-slate-600/90 text-white border-0">{course.difficulty}</Badge>
              <Badge variant="outline" className="border-white/30 bg-black/30 text-white backdrop-blur-sm">
                {course.provider}
              </Badge>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
          <MetaItem icon={Users} label="Students" value={course.enrolledStudents.toLocaleString()} />
          <MetaItem icon={Clock} label="Duration" value={course.duration} />
          <MetaItem icon={BookOpen} label="Lessons" value={String(getAllLessons(course).length)} />
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Your progress</span>
              <span className="font-semibold tabular-nums">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 p-4 sm:flex-row sm:p-5">
          <Button className="gap-2 shadow-sm" asChild>
            <Link href={`/courses/${course.slug}/lesson/${resumeLesson.id}`}>
              <Play className="h-4 w-4 fill-current" />
              Resume Learning
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setShowAi(true)}>
            <Sparkles className="h-4 w-4" />
            AI Summary
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <a
              href={getLiveClassUrl(course.liveClassRoom)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video className="h-4 w-4" />
              Join Live Class
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </Button>
        </div>
      </section>

      <p className="text-sm leading-relaxed text-muted-foreground">{course.description}</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="mb-3 text-base font-semibold tracking-tight">Curriculum</h2>
            <CurriculumList
              course={course}
              slug={course.slug}
              completedIds={completedIds}
              currentLessonId={resumeLesson.id}
            />
          </div>
          <CourseAssignments
            assignments={course.assignments}
            onChange={() => setAssignmentProgress(getAssignmentProgress())}
          />
        </div>
        <div className="space-y-4">
          <CourseCertificate
            progress={progress}
            requiredProgress={course.certificateRequiredProgress}
            course={course}
          />
          <CourseAiPanel
            insights={course.aiInsights}
            course={course}
            lesson={resumeLesson}
            moduleTitle={
              course.modules.find((module) =>
                module.lessons.some((lesson) => lesson.id === resumeLesson.id)
              )?.title
            }
            progress={progress}
          />
        </div>
      </div>

      {aiModalCourse && (
        <AiSummaryModal
          course={aiModalCourse}
          open={showAi}
          onClose={() => setShowAi(false)}
        />
      )}
    </div>
  )
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  )
}
