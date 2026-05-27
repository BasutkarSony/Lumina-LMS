"use client"

import { FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const assignments = [
  {
    id: 1,
    title: "Training Diagnostics Case Study",
    course: "Deep Learning Fundamentals",
    dueDate: "Tomorrow, 11:59 PM",
    status: "urgent",
    type: "Case Study",
  },
  {
    id: 2,
    title: "Transformer Attention Visualization",
    course: "Natural Language Processing",
    dueDate: "May 28, 2026",
    status: "pending",
    type: "Assignment",
  },
  {
    id: 3,
    title: "CNN Error Analysis Report",
    course: "Computer Vision & CNNs",
    dueDate: "May 30, 2026",
    status: "pending",
    type: "Report",
  },
  {
    id: 4,
    title: "React Component Library",
    course: "Full Stack React & Next.js",
    dueDate: "Completed",
    status: "completed",
    type: "Project",
  },
]

export function UpcomingAssignments() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="dashboard-section-title">Assignments</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-primary transition-colors hover:bg-primary/10"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-0.5">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="interactive-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 p-2"
          >
            <div
              className={`rounded-md p-2 ${
                assignment.status === "urgent"
                  ? "bg-destructive/10"
                  : assignment.status === "completed"
                    ? "bg-chart-4/10"
                    : "bg-primary/10"
              }`}
            >
              {assignment.status === "completed" ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-chart-4" />
              ) : assignment.status === "urgent" ? (
                <AlertCircle className="h-3.5 w-3.5 text-destructive" />
              ) : (
                <FileText className="h-3.5 w-3.5 text-primary" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="truncate text-sm font-medium">{assignment.title}</h4>
                <Badge variant="secondary" className="shrink-0 px-1 py-0 text-[10px]">
                  {assignment.type}
                </Badge>
              </div>
              <p className="truncate text-xs text-muted-foreground">{assignment.course}</p>
            </div>

            <span
              className={`shrink-0 text-right text-[11px] leading-none tabular-nums ${
                assignment.status === "urgent"
                  ? "font-medium text-destructive"
                  : assignment.status === "completed"
                    ? "text-chart-4"
                    : "text-muted-foreground"
              }`}
            >
              {assignment.dueDate}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
