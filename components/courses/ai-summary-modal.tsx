"use client"

import { Sparkles, Lightbulb, ListChecks, HelpCircle } from "lucide-react"
import { SimpleModal } from "@/components/courses/simple-modal"
import type { EnrolledCourse } from "@/lib/courses-data"

interface AiSummaryModalProps {
  course: EnrolledCourse | null
  open: boolean
  onClose: () => void
}

export function AiSummaryModal({ course, open, onClose }: AiSummaryModalProps) {
  if (!course) return null

  const { aiSummary } = course

  return (
    <SimpleModal
      open={open}
      onClose={onClose}
      title="AI Lesson Summary"
      description={`${course.currentLesson.title} · ${course.title}`}
      className="sm:max-w-xl"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed">{aiSummary.overview}</p>
        </div>

        <section className="space-y-2">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold">
            <Lightbulb className="h-3.5 w-3.5 text-chart-5" />
            Key concepts
          </h3>
          <ul className="space-y-1.5">
            {aiSummary.keyConcepts.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-md bg-secondary/60 px-2.5 py-1.5 text-xs leading-snug"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold">
            <ListChecks className="h-3.5 w-3.5 text-chart-4" />
            Quick revision
          </h3>
          <ul className="space-y-1.5">
            {aiSummary.revisionPoints.map((item) => (
              <li key={item} className="text-xs leading-relaxed text-muted-foreground">
                • {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold">
            <HelpCircle className="h-3.5 w-3.5 text-accent" />
            Practice questions
          </h3>
          <ul className="space-y-2">
            {aiSummary.practiceQuestions.map((q) => (
              <li
                key={q}
                className="rounded-md border border-border bg-card px-2.5 py-2 text-xs leading-snug"
              >
                {q}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SimpleModal>
  )
}
