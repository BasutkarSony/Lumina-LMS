"use client"

import { Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MobileInsights() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:hidden">
      <Card className="dashboard-card interactive-card border border-border/60">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title flex items-center gap-2 text-sm">
            <Target className="h-3.5 w-3.5 text-primary" />
            Daily Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={50} className="h-1.5" />
          <p className="text-xs text-muted-foreground">2 of 4 goals completed today</p>
        </CardContent>
      </Card>
      <Card className="dashboard-card interactive-card border border-border/60">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            Next Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Deep Learning lab - Today at 4:00 PM
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
