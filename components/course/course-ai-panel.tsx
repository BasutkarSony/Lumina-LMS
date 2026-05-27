"use client"

import { Sparkles, Lightbulb, RotateCcw, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CourseDetail, CourseLesson } from "@/lib/course-data"

export function CourseAiPanel({
  insights,
  course,
  lesson,
  moduleTitle,
  progress,
}: {
  insights: CourseDetail["aiInsights"]
  course?: CourseDetail
  lesson?: CourseLesson
  moduleTitle?: string
  progress?: number
}) {
  const quizPrompt = lesson
    ? `Mini quiz: define the core idea in "${lesson.title}", name one practical use, and identify one common mistake.`
    : "Mini quiz: summarize the current module, identify a weak concept, and choose one revision task."
  const interviewPrompt = course
    ? `Interview prep: explain how ${course.title} applies in a real learner project.`
    : "Interview prep: explain one completed concept with an example."

  return (
    <Card className="dashboard-card border border-primary/15 bg-primary/5">
      <CardHeader className="pb-0">
        <CardTitle className="dashboard-section-title flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Learning Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {course && (
          <AiBlock
            icon={Sparkles}
            label="Learning context"
            text={`${course.title}${moduleTitle ? ` - ${moduleTitle}` : ""}${
              typeof progress === "number" ? ` - ${progress}% complete` : ""
            }`}
          />
        )}
        <AiBlock icon={Sparkles} label="Current lesson summary" text={insights.summary} />
        <AiBlock icon={Lightbulb} label="Concept explanation" text={insights.conceptExplanation} />
        <AiBlock icon={RotateCcw} label="Revision suggestion" text={insights.revisionSuggestion} />
        <AiBlock icon={AlertCircle} label="Weak topic focus" text={insights.weakTopicSuggestion} />
        <AiBlock icon={Lightbulb} label="Mini quiz" text={quizPrompt} />
        <AiBlock icon={RotateCcw} label="Interview question" text={interviewPrompt} />
      </CardContent>
    </Card>
  )
}

function AiBlock({
  icon: Icon,
  label,
  text,
}: {
  icon: typeof Sparkles
  label: string
  text: string
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/80 p-2.5">
      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {label}
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  )
}
