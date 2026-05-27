"use client"

import { useState } from "react"
import { Upload, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CourseAssignment } from "@/lib/course-data"
import {
  getAssignmentProgress,
  markAssignmentSubmitted,
} from "@/lib/assignment-storage"

const statusStyles: Record<CourseAssignment["status"], string> = {
  pending: "bg-secondary text-secondary-foreground",
  submitted: "bg-primary/10 text-primary",
  graded: "bg-chart-4/15 text-chart-4",
  overdue: "bg-destructive/10 text-destructive",
}

export function CourseAssignments({
  assignments,
  onChange,
}: {
  assignments: CourseAssignment[]
  onChange?: () => void
}) {
  const [uploaded, setUploaded] = useState<Record<string, boolean>>(() => {
    const progress = getAssignmentProgress()
    return Object.fromEntries(
      Object.entries(progress).map(([id, status]) => [id, status !== "pending"])
    )
  })

  return (
    <Card className="dashboard-card border border-border/60">
      <CardHeader className="pb-0">
        <CardTitle className="dashboard-section-title">Assignments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex flex-col gap-2 rounded-lg border border-border/60 bg-secondary/20 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-2.5">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{assignment.title}</p>
                <p className="text-xs text-muted-foreground">Due {assignment.dueDate}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge className={statusStyles[assignment.status]} variant="secondary">
                {uploaded[assignment.id] ? "submitted" : assignment.status}
              </Badge>
              {assignment.status === "pending" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1.5 text-xs"
                  onClick={() => {
                    markAssignmentSubmitted(assignment.id)
                    setUploaded((prev) => ({ ...prev, [assignment.id]: true }))
                    onChange?.()
                  }}
                >
                  <Upload className="h-3 w-3" />
                  Upload
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
