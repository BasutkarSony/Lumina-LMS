# Lumina LMS

## Project Overview
Lumina LMS is a modern, premium‑grade learning management system built for a hackathon showcase. It provides a seamless student experience with **AI‑powered learning assistance**, mentor and admin dashboards, live‑class scheduling, and robust Supabase‑backed authentication.

## Problem Statement
Educational platforms are fragmented: separate tools for courses, live sessions, progress tracking, and community interaction create overhead for students and educators. Learners struggle to stay engaged, track progress, and receive contextual help.

## Solution Overview
Lumina LMS unifies all core learning flows into a single responsive web app:
- **Student portal** with road‑maps, streaks, and AI coach.
- **Mentor & Admin** interfaces for course management, batch creation, announcements, and timetable scheduling.
- **Live class integration** via Jitsi.
- **Supabase** for authentication, data persistence, and offline fallback.
- **Gemini 1.5 Flash** provides on‑demand explanations, quizzes, interview prep, and practical mini‑projects.

## Feature Highlights
- Role‑switcher (Student / Mentor / Admin) in the header.
- Calendar‑style timetable for live sessions and mentor availability.
- Verified courses including a new **Data Structures & Algorithms (MIT OpenCourseWare)**.
- Contextual AI learning coach with explanations, summaries, revision notes, mini‑quizzes, interview questions, and practical applications.
- Announcements banner, batch cohorts, learning resources library.
- Responsive design with dark‑mode support.

## AI Learning Layer
Powered by **Google Gemini 1.5 Flash** (environment variable `GOOGLE_GENERATIVE_AI_API_KEY`). The AI generates strict JSON matching our `LearningCoachResponse` schema for each lesson, enabling:
- Simplified explanations.
- Lesson summaries.
- Revision bullet‑points (including common mistakes and memory hooks).
- Adaptive mini‑quizzes and interview style questions.
- Mini‑project suggestions with success criteria.

## Mentor / Admin Workflows
- **Admin Dashboard**: create/edit courses, manage batches, publish announcements, upload learning resources.
- **Mentor Dashboard**: define availability slots, schedule live classes, view learner rosters, grade assignments.
- All actions persist to Supabase tables (`announcements`, `batches`, `mentor_slots`, `learning_resources`).

## Live Classes
Integrated Jitsi meet links allow instant video sessions. Attendance is recorded automatically and appears on the student progress page.

## Supabase Authentication
- Email/password sign‑up and sign‑in.
- Session‑based role handling.
- Server‑side syncing of profile data (progress, assignments, streaks).

## Gemini Integration
All AI calls go through `generateLearningCoachResponse` in `lib/ai.ts`. If the API key is missing, a fallback deterministic response is used.

## Roadmap Learning Support
- Progressive unlocking of lessons based on streaks.
- Adaptive AI suggestions based on assignment status.
- Exportable learning paths.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with TypeScript.
- **Styling**: TailwindCSS + custom CSS for premium UI.
- **State**: React Context (`RoleContext`).
- **Database**: Supabase (PostgreSQL) for user profiles, batches, announcements, etc.
- **AI**: Gemini 1.5 Flash via Google Generative AI API.
- **Deployment**: Vercel (serverless) with environment variables.

## Architecture Overview
```
src/
├─ app/                # Next.js pages & layout
│   └─ layout.tsx      # wraps app with RoleProvider
├─ components/         # UI components (header, sidebar, dashboards)
├─ lib/                # utilities, Supabase client, AI logic, storage helpers
│   ├─ role-context.tsx   # React context for role switching
│   ├─ admin-mentor-storage.ts  # CRUD for admin/mentor data
│   └─ ai.ts            # Gemini request builder & fallback
└─ hooks/              # custom hooks (student profile)
```

## Setup Instructions
1. **Clone repo** `git clone https://github.com/BasutkarSony/Lumina-LMS.git`
2. **Install deps** `npm install`
3. **Create `.env.local`** with the following keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
   ```
4. **Run locally** `npm run dev` and open `http://localhost:3000`.
5. **Run tests** (if any) `npm test`.

## Environment Variables
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server‑side key for upserts |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini 1.5 Flash API key |
| `NEXT_PUBLIC_BASE_URL` (optional) | Base URL for Vercel preview |

## Deployment Guide (Vercel)
1. Push to `main`.
2. In Vercel dashboard, import the repository.
3. Set the same environment variables in Vercel > Settings > Environment Variables.
4. Vercel will automatically run `npm run build` and deploy.

## Demo Credentials
- **Student**: `sony@example.com` / `password123`
- **Mentor**: `mentor@example.com` / `mentorpass`
- **Admin**: `admin@example.com` / `adminpass`
*(These users are seeded in the Supabase dev instance.)*


## Future Scope
- Gamified badge system.
- Course recommendation engine using AI analytics.
- Real‑time chat between mentors and students.
- Multi‑language support.
- Integration with external LMS APIs (Moodle, Canvas).
