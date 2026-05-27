"use client"

import { Award, Download, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CourseDetail } from "@/lib/course-data"
import { useStudentProfile } from "@/hooks/use-student-profile"

interface CourseCertificateProps {
  progress: number
  requiredProgress: number
  course: CourseDetail
}

function pdfText(value: string) {
  return value.replace(/[\\()]/g, "\\$&")
}

function downloadCertificatePdf(studentName: string, course: CourseDetail) {
  const completionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const stream = [
    "BT",
    "/F1 28 Tf 72 720 Td (Lumina LMS) Tj",
    "/F1 20 Tf 0 -48 Td (Certificate of Completion) Tj",
    "/F1 14 Tf 0 -60 Td (This certifies that) Tj",
    `/F1 24 Tf 0 -34 Td (${pdfText(studentName)}) Tj`,
    `/F1 14 Tf 0 -44 Td (completed ${pdfText(course.title)}) Tj`,
    `/F1 13 Tf 0 -28 Td (Provider: ${pdfText(course.provider)}) Tj`,
    `/F1 13 Tf 0 -26 Td (Completion date: ${pdfText(completionDate)}) Tj`,
    "/F1 10 Tf 0 -56 Td (Issued by Lumina LMS for learner engagement and course completion.) Tj",
    "ET",
  ].join("\n")

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]

  let pdf = "%PDF-1.4\n"
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })
  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  const blob = new Blob([pdf], { type: "application/pdf" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `lumina-lms-${course.slug}-certificate.pdf`
  link.click()
  URL.revokeObjectURL(url)
}

export function CourseCertificate({ progress, requiredProgress, course }: CourseCertificateProps) {
  const unlocked = progress >= requiredProgress
  const eligibility = Math.min(100, Math.round((progress / requiredProgress) * 100))
  const { profile } = useStudentProfile()

  return (
    <Card className="dashboard-card border border-border/60">
      <CardHeader className="pb-0">
        <CardTitle className="dashboard-section-title flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          Certificate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/20 p-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              unlocked ? "bg-chart-4/15" : "bg-muted"
            }`}
          >
            {unlocked ? (
              <Award className="h-5 w-5 text-chart-4" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {unlocked ? "Certificate unlocked" : "Certificate locked"}
            </p>
            <p className="text-xs text-muted-foreground">
              {unlocked
                ? "You meet the completion requirements."
                : `Complete ${requiredProgress}% to unlock`}
            </p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Eligibility</span>
            <span className="font-medium tabular-nums">{eligibility}%</span>
          </div>
          <Progress value={eligibility} className="h-1.5" />
          <p className="text-[11px] text-muted-foreground">
            Course progress: {progress}% - Required: {requiredProgress}%
          </p>
        </div>
        <Button
          size="sm"
          className="w-full gap-1.5"
          disabled={!unlocked}
          onClick={() => downloadCertificatePdf(profile.name, course)}
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </Button>
      </CardContent>
    </Card>
  )
}
