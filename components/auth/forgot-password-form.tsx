"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/auth/form-field"
import { sendPasswordReset } from "@/lib/student-profile"

function validateEmail(email: string) {
  if (!email.trim()) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address"
  return ""
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const emailError = validateEmail(email)
    setError(emailError)
    if (!emailError) {
      setLoading(true)
      try {
        await sendPasswordReset(email)
        setSent(true)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to send reset link")
      } finally {
        setLoading(false)
      }
    }
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/15">
          <CheckCircle2 className="h-6 w-6 text-chart-4" />
        </div>
        <div className="space-y-1">
          <p className="font-medium">Check your inbox</p>
          <p className="text-sm text-muted-foreground">
            We sent a reset link to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login">Back to sign in</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="you@university.edu"
        value={email}
        onChange={setEmail}
        onBlur={() => submitted && setError(validateEmail(email))}
        error={submitted ? error : undefined}
        autoComplete="email"
      />

      <Button type="submit" className="h-10 w-full transition-transform active:scale-[0.99]">
        {loading ? "Sending..." : "Send reset link"}
      </Button>

      <Button variant="ghost" className="h-9 w-full gap-1.5" asChild>
        <Link href="/login">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </Button>
    </form>
  )
}
