// admin-mentor-storage.ts - storage helpers for admin/mentor data
import { supabase } from "@/lib/supabase";

export type Announcement = {
  id: string;
  title: string;
  message: string;
  created_at: string;
};

export type Batch = {
  id: string;
  name: string;
};

export type MentorSlot = {
  id: string;
  mentor_id: string;
  start: string; // ISO datetime
  end: string; // ISO datetime
};

export type LearningResource = {
  id: string;
  title: string;
  url: string;
  uploaded_by: string;
};

// Simple CRUD wrappers – errors are logged, callers handle them.
export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const { data, error } = await supabase.from("announcements").select("*");
  if (error) console.error("fetchAnnouncements error", error);
  return data || [];
};

export const createAnnouncement = async (ann: Omit<Announcement, "id" | "created_at">) => {
  const { data, error } = await supabase.from("announcements").insert(ann).single();
  if (error) console.error("createAnnouncement error", error);
  return data;
};

export const fetchBatches = async (): Promise<Batch[]> => {
  const { data, error } = await supabase.from("batches").select("*");
  if (error) console.error("fetchBatches error", error);
  return data || [];
};

export const fetchMentorSlots = async (mentorId: string): Promise<MentorSlot[]> => {
  const { data, error } = await supabase
    .from("mentor_slots")
    .select("*")
    .eq("mentor_id", mentorId);
  if (error) console.error("fetchMentorSlots error", error);
  return data || [];
};

export const fetchLearningResources = async (): Promise<LearningResource[]> => {
  const { data, error } = await supabase.from("learning_resources").select("*");
  if (error) console.error("fetchLearningResources error", error);
  return data || [];
};
