import { AuthLayout } from "@/components/auth/auth-layout"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Join Lumina LMS and start learning today">
      <SignupForm />
    </AuthLayout>
  )
}
