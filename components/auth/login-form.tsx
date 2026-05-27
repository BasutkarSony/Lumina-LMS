"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { FormField } from "@/components/auth/form-field"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"
import { signInStudent } from "@/lib/student-profile"

function validateEmail(email: string) {
  if (!email.trim()) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address"
  return ""
}

function validatePassword(password: string) {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  return ""
}

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    setErrors({ email: emailError, password: passwordError })
    if (!emailError && !passwordError) {
      setLoading(true)
      try {
        await signInStudent(email, password)
        router.push("/")
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          form: error instanceof Error ? error.message : "Unable to sign in",
        }))
      } finally {
        setLoading(false)
      }
    }
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
        onBlur={() =>
          submitted && setErrors((prev) => ({ ...prev, email: validateEmail(email) }))
        }
        error={submitted ? errors.email : undefined}
        autoComplete="email"
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs text-primary transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() =>
            submitted &&
            setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
          }
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          className={cn(
            "h-10 transition-colors",
            submitted && errors.password && "border-destructive focus-visible:ring-destructive/30"
          )}
        />
        {submitted && errors.password && (
          <p className="text-xs text-destructive" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      <Button type="submit" className="h-10 w-full transition-transform active:scale-[0.99]">
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      {submitted && errors.form && (
        <p className="text-center text-xs text-destructive" role="alert">
          {errors.form}
        </p>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialLoginButtons />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-primary transition-colors hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}
