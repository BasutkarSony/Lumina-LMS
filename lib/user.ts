import { demoStudentProfile } from "@/lib/student-profile"

export const currentUser = {
  firstName: "Sony",
  fullName: demoStudentProfile.name,
  initials: "S",
  role: demoStudentProfile.role,
} as const
