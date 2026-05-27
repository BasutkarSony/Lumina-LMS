"use client"

import { useEffect, useState } from "react"
import {
  getCachedStudentProfile,
  getCurrentStudentProfile,
  profileFromSession,
  type StudentProfile,
} from "@/lib/student-profile"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(() => getCachedStudentProfile())
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    let active = true

    getCurrentStudentProfile().then((currentProfile) => {
      if (!active) return
      setProfile(currentProfile)
      setLoading(false)
    })

    if (!isSupabaseConfigured || !supabase) {
      return () => {
        active = false
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setProfile(profileFromSession(session))
      setLoading(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  return { profile, loading }
}
