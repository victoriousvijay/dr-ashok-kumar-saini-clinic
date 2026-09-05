# Development Workflow

## Phase 1 — Discovery
1. Confirm doctor/clinic facts.
2. Confirm exact clinic name, address, phone, timings and booking process.
3. Confirm services.
4. Confirm whether WhatsApp/call booking is desired.
5. Confirm staff roles and CRM workflow.
6. Confirm whether online appointment slots are real-time or enquiry-based.

Never invent missing facts.

## Phase 2 — Foundation
1. Create Next.js project.
2. Configure TypeScript.
3. Configure Tailwind/UI system.
4. Configure Supabase.
5. Configure environment variables.
6. Establish linting and formatting.
7. Create base layout and navigation.

## Phase 3 — Design System
Build:
- Typography scale
- Spacing
- Cards
- Buttons
- Inputs
- Badges
- Modals
- Tables
- Empty states
- Toasts
- Loading states

Then build the marketing shell.

## Phase 4 — Public Website
Build in this order:
1. Header/navigation
2. Hero
3. Trust/value section
4. Services grid
5. Doctor section
6. How consultation works
7. Location/contact
8. Appointment CTA
9. Footer
10. Service detail pages
11. Blog/resources

## Phase 5 — CRM
Build:
1. Authentication
2. Dashboard
3. Lead inbox
4. Lead detail
5. Patient records
6. Appointment management
7. Follow-up queue
8. Notes
9. Filters/search
10. Basic analytics
11. Settings/roles

## Phase 6 — Integrations
Recommended MVP integrations:
- Website enquiry → Supabase lead
- Appointment request → lead + appointment request
- Optional WhatsApp click-to-chat
- Email notification to clinic
- Optional calendar integration later

Avoid adding complex integrations before the core workflow works.

## Phase 7 — SEO
For every public page:
- title
- meta description
- canonical
- Open Graph metadata
- H1
- semantic headings
- internal links
- alt text
- structured data where factual

Create location-focused but genuinely useful content.

## Phase 8 — QA
Test:
- Mobile
- Tablet
- Desktop
- Chrome
- Safari
- Firefox
- Keyboard navigation
- Screen reader basics
- Reduced motion
- Slow network
- Form validation
- Auth permissions
- RLS policies
- Empty/error/loading states

## Phase 9 — Launch
Before launch:
- Verify every doctor/clinic fact.
- Verify phone/address/timing.
- Verify all CTAs.
- Test enquiry creation.
- Test CRM permissions.
- Test database backups/recovery plan.
- Add analytics without collecting unnecessary patient data.
- Submit sitemap to Google Search Console.
- Connect/optimize Google Business Profile.

## Working Rule
Build vertical slices, not disconnected screens.

A complete lead flow is more valuable than ten unfinished CRM pages.
