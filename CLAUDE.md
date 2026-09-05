# Dr. Ashok Kumar Saini Clinic — Project Instructions

## Product
Build a premium healthcare website + private clinic CRM for Dr. Ashok Kumar Saini, Jaipur.

The product has two surfaces:
1. Public SEO-first clinic website for patients and Google search.
2. Authenticated CRM portal for clinic staff to manage leads, appointments, patients, follow-ups and operational notes.

## Primary Goals
- Make the clinic look credible, modern and trustworthy.
- Generate appointment enquiries from Google and the website.
- Rank for relevant local-intent searches in Jaipur.
- Give the clinic one simple place to manage leads and patients.
- Keep the CRM private and separated from the public website.

## Brand Direction
Visual language: premium medical, calm, modern, immersive, human.
Use subtle 3D depth, glass surfaces, soft gradients, floating medical-inspired forms and tasteful motion.
Do NOT make it look like a gaming site, crypto site or futuristic sci-fi dashboard.
Accessibility and readability always beat visual effects.

Suggested palette:
- Deep navy / midnight background
- White / warm off-white surfaces
- Calm blue or teal accent
- Very limited warm accent for calls-to-action

Typography:
- Clean modern sans-serif
- Strong hierarchy
- Large editorial headings
- Comfortable body text

## Core Public Pages
- Home
- About Doctor
- Services
- Individual service pages
- Child & Adolescent Psychiatry
- Addiction / Drug De-addiction
- Sexual Health
- Anxiety & Stress
- Sleep Clinic
- Psychotherapy
- Geriatric Psychiatry
- Headache Clinic
- Contact / Location
- Book Appointment
- Blog / Mental Health Resources
- Privacy Policy
- Terms

## Core CRM Modules
- Dashboard
- Leads
- Patients
- Appointments
- Follow-ups
- Notes
- Services
- Sources
- Staff/users
- Basic analytics
- Settings

## Lead Pipeline
New → Contacted → Appointment Scheduled → Visited → Follow-up → Converted / Lost

## Important Medical-Data Rule
The CRM may contain sensitive patient information. Treat all patient data as confidential.
- Never expose patient data on public pages.
- Use authenticated access.
- Use role-based permissions.
- Do not store unnecessary sensitive information.
- Do not put patient details into URLs, analytics events or public logs.
- Validate and sanitize all inputs.
- Keep audit-friendly timestamps for important CRM changes.
- Production deployment must use HTTPS and secure environment variables.

## SEO
Prioritize local SEO for Jaipur:
- Clear service/location pages
- Unique page titles and meta descriptions
- Proper H1/H2 hierarchy
- Internal linking
- LocalBusiness / MedicalBusiness structured data where appropriate
- Doctor/physician structured data where appropriate
- Sitemap
- robots.txt
- Canonical URLs
- Fast Core Web Vitals
- Descriptive image alt text
- Google Business Profile consistency

Do not keyword-stuff medical pages. Content must remain useful and trustworthy.

## Conversion
Primary CTA: Book an Appointment
Secondary CTA: Call Clinic / WhatsApp enquiry where appropriate.

Every major service page should have:
- What the service is
- Who it may help
- What consultation involves
- Clear CTA
- Location/contact information
- Appropriate medical disclaimer where needed

## Engineering Principles
- Component-driven architecture
- Mobile-first responsive design
- Server-side rendering/static generation where useful for SEO
- Strong TypeScript typing
- Reusable UI primitives
- Form validation
- Loading/error/empty states
- Accessible keyboard navigation
- Respect prefers-reduced-motion
- Keep 3D effects progressively enhanced and lightweight

## Never
- Invent doctor qualifications, awards, hospital affiliations or testimonials.
- Make medical guarantees such as "100% cure".
- Publish private CRM data.
- Use fake reviews.
- Use excessive animations that hurt performance.
- Build a beautiful frontend with weak SEO fundamentals.
