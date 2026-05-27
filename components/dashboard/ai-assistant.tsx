"use client"

import { Sparkles, Send, Lightbulb, BookOpen, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { enrolledCourses } from "@/lib/courses-data"
import { useStudentProfile } from "@/hooks/use-student-profile"

const suggestions = [
  { icon: Lightbulb, text: "Explain my current lesson" },
  { icon: BookOpen, text: "Create revision bullets" },
  { icon: HelpCircle, text: "Generate a mini quiz" },
]

export function AIAssistant() {
  const { profile } = useStudentProfile()
  const activeCourse =
    enrolledCourses.find((course) => {
      const completed = profile.progress[course.slug]?.length ?? 0
      return completed > 0 && completed < course.lessonCount
    }) ?? enrolledCourses[0]

  return (
    <Card className="dashboard-card bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <CardHeader className="pb-0">
        <CardTitle className="dashboard-section-title flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          AI Learning Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Context: {activeCourse.title}. Ask for summaries, revision bullets, quizzes,
          interview questions, or nudges for the next module.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.text}
              variant="outline"
              size="sm"
              className="h-7 gap-1 px-2 text-[11px]"
            >
              <suggestion.icon className="h-3 w-3" />
              {suggestion.text}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Input
            placeholder="Ask for lesson help..."
            className="h-9 bg-background pr-9 text-sm"
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
