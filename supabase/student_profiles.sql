create table if not exists public.student_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'AIML Student',
  enrolled_courses text[] not null default '{}',
  progress jsonb not null default '{}'::jsonb,
  assignments jsonb not null default '{}'::jsonb,
  streak jsonb not null default '{"current": 0, "weeklyGoal": 5}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;

alter table public.student_profiles
  add column if not exists assignments jsonb not null default '{}'::jsonb,
  add column if not exists streak jsonb not null default '{"current": 0, "weeklyGoal": 5}'::jsonb;

create policy "Students can read their profile"
  on public.student_profiles
  for select
  using (auth.uid() = id);

create policy "Students can insert their profile"
  on public.student_profiles
  for insert
  with check (auth.uid() = id);

create policy "Students can update their profile"
  on public.student_profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
