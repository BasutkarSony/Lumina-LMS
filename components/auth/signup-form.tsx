"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/auth/form-field"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"
import { signUpStudent } from "@/lib/student-profile"

function validateName(name: string) {
  if (!name.trim()) return "Full name is required"
  if (name.trim().length < 2) return "Name must be at least 2 characters"
  return ""
}

function validateEmail(email: string) {
  if (!email.trim()) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address"
  return ""
}

function validatePassword(password: string) {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Include at least one uppercase letter and one number"
  }
  return ""
}

export function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    terms?: string
    form?: string
  }>({})
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmationNotice, setConfirmationNotice] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    const termsError = acceptedTerms ? "" : "You must accept the terms to continue"
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      terms: termsError,
    })
    if (!nameError && !emailError && !passwordError && !termsError) {
      setLoading(true)
      setConfirmationNotice("")
      try {
        const { needsEmailConfirmation } = await signUpStudent(name, email, password)
        if (needsEmailConfirmation) {
          setConfirmationNotice("Account created. Check your email to confirm your sign in.")
          return
        }
        router.push("/")
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          form: error instanceof Error ? error.message : "Unable to create account",
        }))
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        id="name"
        label="Full name"
        placeholder="Sony"
        value={name}
        onChange={setName}
        onBlur={() =>
          submitted && setErrors((prev) => ({ ...prev, name: validateName(name) }))
        }
        error={submitted ? errors.name : undefined}
        autoComplete="name"
      />
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
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        onBlur={() =>
          submitted &&
          setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
        }
        error={submitted ? errors.password : undefined}
        autoComplete="new-password"
      />

      <div className="space-y-1.5">
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
          />
          <span className="text-muted-foreground">
            I agree to the{" "}
            <span className="text-foreground underline-offset-2 hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-foreground underline-offset-2 hover:underline">
              Privacy Policy
            </span>
          </span>
        </label>
        {submitted && errors.terms && (
          <p className="text-xs text-destructive" role="alert">
            {errors.terms}
          </p>
        )}
      </div>

      <Button type="submit" className="h-10 w-full transition-transform active:scale-[0.99]">
        {loading ? "Creating account..." : "Create account"}
      </Button>

      {submitted && errors.form && (
        <p className="text-center text-xs text-destructive" role="alert">
          {errors.form}
        </p>
      )}

      {confirmationNotice && (
        <p className="text-center text-xs text-muted-foreground" role="status">
          {confirmationNotice}
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
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary transition-colors hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
