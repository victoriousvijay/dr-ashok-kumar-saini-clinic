# Supabase Schema Blueprint

## Tables

### profiles
```sql
id uuid primary key references auth.users(id)
full_name text not null
role text not null check (role in ('admin','doctor','staff'))
phone text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### services
```sql
id uuid primary key default gen_random_uuid()
name text not null
slug text unique not null
description text
active boolean default true
created_at timestamptz default now()
updated_at timestamptz default now()
```

### leads
```sql
id uuid primary key default gen_random_uuid()
name text not null
phone text not null
email text
source text
interested_service text
status text not null default 'new'
enquiry_message text
assigned_to uuid references profiles(id)
created_at timestamptz default now()
updated_at timestamptz default now()
```

### patients
```sql
id uuid primary key default gen_random_uuid()
lead_id uuid references leads(id)
name text not null
phone text not null
email text
date_of_birth date
gender text
address text
emergency_contact text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### appointments
```sql
id uuid primary key default gen_random_uuid()
patient_id uuid references patients(id)
lead_id uuid references leads(id)
appointment_date date not null
appointment_time time not null
appointment_type text
status text not null default 'requested'
assigned_to uuid references profiles(id)
notes text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### follow_ups
```sql
id uuid primary key default gen_random_uuid()
patient_id uuid references patients(id)
due_at timestamptz not null
type text
status text not null default 'pending'
note text
assigned_to uuid references profiles(id)
completed_at timestamptz
created_at timestamptz default now()
```

### notes
```sql
id uuid primary key default gen_random_uuid()
patient_id uuid references patients(id)
author_id uuid references profiles(id)
note text not null
created_at timestamptz default now()
updated_at timestamptz default now()
```

### activity_log
```sql
id uuid primary key default gen_random_uuid()
actor_id uuid references profiles(id)
entity_type text not null
entity_id uuid not null
action text not null
created_at timestamptz default now()
```

## RLS Requirement

Enable Row Level Security on every private table.

Never rely on frontend route protection alone.

Public enquiry insertion should use a carefully constrained server-side endpoint or controlled database policy. Public users must never receive read access to leads, patients, appointments, notes or activity logs.

## Future Enhancements
- WhatsApp integration
- Email/SMS reminders
- Google Calendar
- Online payment
- Prescription/clinical modules only after proper compliance and workflow review
- Multi-location support
