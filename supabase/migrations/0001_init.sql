-- Initial schema for Dr. Ashok Kumar Saini Clinic CRM.
-- Mirrors SUPABASE_SCHEMA.md. Apply with `supabase db push` once a project exists.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin','doctor','staff')),
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  source text,
  interested_service text,
  status text not null default 'new'
    check (status in ('new','contacted','appointment_scheduled','visited','follow_up','converted','lost')),
  enquiry_message text,
  assigned_to uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  name text not null,
  phone text not null,
  email text,
  date_of_birth date,
  gender text,
  address text,
  emergency_contact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  lead_id uuid references leads(id),
  appointment_date date not null,
  appointment_time time not null,
  appointment_type text,
  status text not null default 'requested'
    check (status in ('requested','confirmed','completed','cancelled','no_show')),
  assigned_to uuid references profiles(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists follow_ups (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id),
  due_at timestamptz not null,
  type text,
  status text not null default 'pending' check (status in ('pending','completed','cancelled')),
  note text,
  assigned_to uuid references profiles(id),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id),
  author_id uuid not null references profiles(id),
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security --------------------------------------------------------

alter table profiles enable row level security;
alter table services enable row level security;
alter table leads enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;
alter table follow_ups enable row level security;
alter table notes enable row level security;
alter table activity_log enable row level security;

-- profiles: a user can read/update only their own profile row.
create policy "profiles_select_own" on profiles for select
  using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update
  using (auth.uid() = id);

-- services: publicly readable (used to render the public services pages).
create policy "services_public_read" on services for select
  using (active = true);
create policy "services_staff_manage" on services for all
  using (auth.uid() in (select id from profiles))
  with check (auth.uid() in (select id from profiles));

-- leads, patients, appointments, follow_ups, notes, activity_log:
-- staff/doctor/admin only. Public enquiry creation happens through the
-- server-side /api/leads route using the service role key, not a public
-- insert policy, so anonymous clients never get direct table access.
create policy "leads_staff_all" on leads for all
  using (auth.uid() in (select id from profiles))
  with check (auth.uid() in (select id from profiles));

create policy "patients_staff_all" on patients for all
  using (auth.uid() in (select id from profiles))
  with check (auth.uid() in (select id from profiles));

create policy "appointments_staff_all" on appointments for all
  using (auth.uid() in (select id from profiles))
  with check (auth.uid() in (select id from profiles));

create policy "follow_ups_staff_all" on follow_ups for all
  using (auth.uid() in (select id from profiles))
  with check (auth.uid() in (select id from profiles));

create policy "notes_staff_all" on notes for all
  using (auth.uid() in (select id from profiles))
  with check (auth.uid() in (select id from profiles));

create policy "activity_log_staff_read" on activity_log for select
  using (auth.uid() in (select id from profiles));
create policy "activity_log_staff_insert" on activity_log for insert
  with check (auth.uid() in (select id from profiles));
