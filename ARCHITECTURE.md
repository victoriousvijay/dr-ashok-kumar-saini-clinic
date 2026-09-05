# Architecture

## Recommended Stack

### Public Website
- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui or a small custom component system
- Framer Motion for UI motion
- Three.js / React Three Fiber for selective 3D hero effects
- next/image for optimized images
- next/font for typography

### Backend
- Supabase
  - PostgreSQL
  - Authentication
  - Row Level Security
  - Storage where required
  - Realtime only where genuinely useful

### Deployment
- Vercel for the web application
- Supabase for backend/database/auth

## Application Structure

```text
app/
  (marketing)/
    page.tsx
    about/
    services/
    contact/
    appointment/
    blog/
  (crm)/
    dashboard/
    leads/
    patients/
    appointments/
    follow-ups/
    notes/
    settings/
  api/
    leads/
    appointments/
    contact/

components/
  marketing/
  crm/
  ui/
  3d/

lib/
  supabase/
  seo/
  validation/
  utils/

types/
  database.ts
```

## Public Website Flow

Google Search
→ SEO Landing Page
→ Service information
→ Trust signals
→ Appointment CTA
→ Enquiry/booking form
→ Lead created in CRM
→ Staff receives new lead
→ Contact patient
→ Appointment scheduled

## CRM Flow

Authenticated Staff
→ Dashboard
→ New lead
→ Lead qualification
→ Appointment
→ Patient record
→ Consultation/follow-up notes
→ Follow-up reminder
→ Conversion/closure

## Data Model

### profiles
- id
- full_name
- role
- phone
- created_at
- updated_at

### leads
- id
- name
- phone
- email
- source
- interested_service
- status
- enquiry_message
- assigned_to
- created_at
- updated_at

### patients
- id
- lead_id nullable
- name
- phone
- email nullable
- date_of_birth nullable
- gender nullable
- address nullable
- emergency_contact nullable
- created_at
- updated_at

Only collect fields that the clinic actually needs.

### appointments
- id
- patient_id nullable
- lead_id nullable
- appointment_date
- appointment_time
- appointment_type
- status
- assigned_to
- notes
- created_at
- updated_at

### follow_ups
- id
- patient_id
- due_at
- type
- status
- note
- assigned_to
- completed_at
- created_at

### notes
- id
- patient_id
- author_id
- note
- created_at
- updated_at

### services
- id
- name
- slug
- description
- active

### activity_log
- id
- actor_id
- entity_type
- entity_id
- action
- created_at

## Security
Use Supabase Row Level Security for every private table.

Roles:
- admin
- doctor
- staff

Minimum principle:
- Public users can create an enquiry/appointment request.
- Public users cannot read CRM records.
- Staff can access only the operational data their role requires.
- Doctor/admin can access clinical/operational records according to configured policy.

## SEO Architecture
Each service should have a dedicated indexable route:
`/services/<service-slug>`

Use metadata generated per page.

Create:
- `/sitemap.xml`
- `/robots.txt`
- Organization/MedicalBusiness schema
- Physician schema if factual data is verified

## 3D Architecture
3D should be isolated into lightweight components:
- HeroScene
- FloatingOrb
- MedicalParticleField
- AmbientDepth

Load heavy 3D code only where needed.
Provide a static fallback for low-power devices and reduced-motion users.
