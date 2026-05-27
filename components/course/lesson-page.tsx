"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YoutubeEmbed } from "@/components/course/youtube-embed"
import { CourseAiPanel } from "@/components/course/course-ai-panel"
import {
  computeProgressPercent,
  getAdjacentLessons,
  getAllLessons,
  isLessonAccessible,
  type CourseDetail,
  type CourseLesson,
} from "@/lib/course-data"
import {
  getCompletedLessonIds,
  markLessonComplete,
} from "@/lib/progress-storage"

interface LessonPageProps {
  course: CourseDetail
  lesson: CourseLesson
}

export function LessonPage({ course, lesson }: LessonPageProps) {
  const router = useRouter()
  const [completedIds, setCompletedIds] = useState<string[]>([])
  const [justCompleted, setJustCompleted] = useState(false)
  const [ready, setReady] = useState(false)

  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  const [aiInsights, setAiInsights] = useState(course.aiInsights)




  useEffect(() => {
    const stored = getCompletedLessonIds(course.slug)
    const ids =
      stored.length > 0
        ? stored
        : getAllLessons(course)
            .filter((l) => l.completed)
            .map((l) => l.id)
    setCompletedIds(ids)
    if (!isLessonAccessible(course, lesson.id, ids) && !ids.includes(lesson.id)) {
      router.replace(`/courses/${course.slug}`)
      return
    }
    setReady(true)
  }, [course, lesson.id, router])

  useEffect(() => {
    if (!ready) return

    // If API key isn't configured, keep lightweight fallback (CourseAiPanel already shows baseline).
    if (typeof process === "undefined" || !process.env?.GOOGLE_GENERATIVE_AI_API_KEY) {
      setAiInsights(course.aiInsights)
      return
    }

    const controller = new AbortController()

    async function run() {

      try {
        setAiError(null)
        setAiLoading(true)

        const payload = {
          course: {
            title: course.title,
            provider: course.provider,
            slug: course.slug,
            aiInsights: course.aiInsights,
          },
          module: {
            id:
              course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id))
                ?.id ?? undefined,
            title:
              course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id))
                ?.title ?? undefined,
          },
          lesson: {
            id: lesson.id,
            title: lesson.title,
          },
          student: {
            name: "Sony",
            role: "AIML Student",
            enrolledCourses: [],
            progress: {},
            assignments: {},
            streak: { current: 0, weeklyGoal: 0, lastActiveDate: "" },
          },
          progress: {
            completedLessonIds: completedIds,
            completedCount: completedIds.length,
            courseLessonCount: getAllLessons(course).length,
            completionPercent: computeProgressPercent(course, completedIds),
          },
          userQuery: undefined,
        }

        const res = await fetch("/api/ai/learning-coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })

        if (!res.ok) throw new Error(`AI request failed (${res.status})`)

        const json = (await res.json()) as unknown

        const data = (json as unknown as { data?: Record<string, unknown> })?.data




        if (!data) throw new Error("AI response missing data")

        setAiInsights({
          summary: (data as { lessonSummary?: string }).lessonSummary ?? course.aiInsights.summary,


          conceptExplanation: (data as { explainSimplified?: string }).explainSimplified ?? course.aiInsights.conceptExplanation,


          revisionSuggestion: Array.isArray((data as { revisionNotes?: unknown }).revisionNotes)
            ? ((data as { revisionNotes?: unknown }).revisionNotes as string[])
                .slice(0, 3)
                .join(" ")
            : ((data as { revisionNotes?: unknown }).revisionNotes as string | undefined) ??
              course.aiInsights.revisionSuggestion,

          weakTopicSuggestion: (() => {
            const instructions = (data as { miniQuiz?: { instructions?: unknown } })
              .miniQuiz?.instructions
            return typeof instructions === "string" && instructions.trim().length > 0
              ? `Focus on weak points: ${instructions}`
              : "Focus on weak concepts and revise before the quiz."
          })(),
        })

      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : undefined

        setAiError(typeof message === "string" ? message : "AI unavailable")
        setAiInsights(course.aiInsights)
        return

      } finally {
        setAiLoading(false)
      }
    }

    run()

    return () => controller.abort()
  }, [ready, course, lesson.id, completedIds])


  const progress = computeProgressPercent(course, completedIds)
  const lessons = getAllLessons(course)
  const lessonIndex = lessons.findIndex((l) => l.id === lesson.id) + 1
  const { prev, next } = getAdjacentLessons(course, lesson.id)
  const isComplete = completedIds.includes(lesson.id)

  const moduleTitle = useMemo(() => {
    return course.modules.find((module) =>
      module.lessons.some((moduleLesson) => moduleLesson.id === lesson.id)
    )?.title
  }, [course.modules, lesson.id])


  const handleMarkComplete = () => {
    const updated = markLessonComplete(course.slug, lesson.id)
    setCompletedIds(updated)
    setJustCompleted(true)
  }

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading lesson…
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {course.title}
        </Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="truncate font-medium">{lesson.title}</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">{lesson.title}</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Lesson {lessonIndex} of {lessons.length} - {lesson.duration} - Provider:{" "}
              {lesson.instructor}
            </p>
          </div>

          <YoutubeEmbed url={lesson.youtubeUrl} title={lesson.title} />

          <Card className="dashboard-card border border-border/60">
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-semibold">Lesson notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{lesson.notes}</p>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {prev && (
              <Button variant="outline" className="gap-1.5" asChild>
                <Link href={`/courses/${course.slug}/lesson/${prev.id}`}>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              </Button>
            )}
            <Button
              variant={isComplete ? "secondary" : "default"}
              className="gap-1.5"
              onClick={handleMarkComplete}
              disabled={isComplete && !justCompleted}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isComplete ? "Completed" : "Mark complete"}
            </Button>
            {next && (
              <Button className="ml-auto gap-1.5 sm:ml-0" asChild>
                <Link href={`/courses/${course.slug}/lesson/${next.id}`}>
                  Next lesson
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="dashboard-card border border-border/60">
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-semibold">Your progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Course completion</span>
                <span className="font-semibold tabular-nums">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-[11px] text-muted-foreground">
                {completedIds.length} of {lessons.length} lessons completed
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-card border border-primary/15 bg-primary/5">
            <CardContent className="!py-3.5">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold">AI explanation</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {course.aiInsights.conceptExplanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>


          <div aria-live="polite">
            {aiLoading ? (
              <CourseAiPanel
                insights={aiInsights}
                course={course}
                lesson={lesson}
                moduleTitle={moduleTitle}
                progress={progress}
              />

            ) : (
              <CourseAiPanel
                insights={aiInsights}
                course={course}
                lesson={lesson}
                moduleTitle={moduleTitle}
                progress={progress}
              />
            )}
          </div>


        </div>
      </div>
    </div>
  )
}
