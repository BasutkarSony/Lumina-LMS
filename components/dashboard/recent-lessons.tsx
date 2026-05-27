"use client"

import { Play, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const lessons = [
  {
    id: 1,
    title: "Hooks and Component State",
    course: "Full Stack React & Next.js",
    duration: "25 min",
    completed: true,
    thumbnail: "from-indigo-600 to-blue-700",
  },
  {
    id: 2,
    title: "Word Vectors and Distributional Semantics",
    course: "Natural Language Processing",
    duration: "35 min",
    completed: true,
    thumbnail: "from-cyan-600 to-teal-700",
  },
  {
    id: 3,
    title: "Gradient Descent and Backpropagation",
    course: "Deep Learning Fundamentals",
    duration: "40 min",
    completed: false,
    thumbnail: "from-slate-600 to-slate-800",
  },
  {
    id: 4,
    title: "Computer Vision Tasks and Image Tensors",
    course: "Computer Vision & CNNs",
    duration: "20 min",
    completed: false,
    thumbnail: "from-indigo-700 to-cyan-800",
  },
]

export function RecentLessons() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="dashboard-section-title">Recent Lessons</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-primary transition-colors hover:bg-primary/10"
        >
          Browse All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="interactive-card group relative overflow-hidden rounded-lg border border-border"
            >
              <div
                className={`relative flex h-20 items-center justify-center bg-gradient-to-br ${lesson.thumbnail}`}
              >
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <div className="rounded-full bg-white/90 p-2">
                    <Play className="h-4 w-4 fill-foreground text-foreground" />
                  </div>
                </button>
                {lesson.completed && (
                  <Badge className="absolute top-1.5 right-1.5 gap-0.5 bg-white/90 px-1.5 py-0 text-[10px] text-foreground">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    Done
                  </Badge>
                )}
              </div>

              <div className="space-y-0.5 p-2.5">
                <h4 className="line-clamp-1 text-sm font-medium leading-snug">{lesson.title}</h4>
                <p className="line-clamp-1 text-xs text-muted-foreground">{lesson.course}</p>
                <div className="flex items-center gap-1 pt-0.5 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3 shrink-0" />
                  <span className="tabular-nums">{lesson.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
