# Build Instructions

## Priority Order

Always optimize in this order:

1. Correctness
2. Trust
3. Conversion
4. SEO
5. Accessibility
6. Performance
7. Visual polish

## UI Rules

### Public Website
The first screen should communicate:
- Who the doctor/clinic is
- What they help with
- Where they are
- How to book

Do not hide the primary CTA behind animations.

Use motion for:
- entrance transitions
- depth
- hover feedback
- scroll reveals
- ambient 3D movement

Do not use:
- constant spinning objects
- distracting particle explosions
- huge WebGL scenes
- motion that makes medical information difficult to read

## Responsive Rules
Design mobile first.

On mobile:
- Keep CTA visible.
- Collapse navigation cleanly.
- Avoid horizontal scrolling.
- 3D can be simplified or disabled.
- Cards should remain easy to scan.
- CRM tables should become cards/drawers where appropriate.

## Forms

Every form needs:
- clear labels
- validation
- success state
- failure state
- loading state
- accessible error messages

Do not collect sensitive medical details in a public marketing enquiry form unless there is a clear business/legal reason.

Recommended public enquiry fields:
- Name
- Phone
- Email optional
- Service
- Preferred contact method
- Short message

## CRM Rules
Every important CRM mutation should:
- validate input
- verify authenticated user
- enforce authorization
- update timestamps
- optionally write an activity event

## SEO Content Rules
Use natural language.

Bad:
"Best psychiatrist Jaipur psychiatrist mental health psychiatrist Jaipur..."

Good:
"Psychiatric consultation and mental health services in Jaipur, with support for concerns including anxiety, sleep problems, addiction and other mental health conditions."

Never claim superiority without evidence.

## Medical Content Rules
Avoid:
- guaranteed outcomes
- absolute claims
- fear-based messaging
- diagnosing visitors
- unsupported treatment claims

Prefer:
- educational language
- "may help"
- "consult a qualified professional"
- clear emergency guidance where relevant

## Code Quality
- Prefer small reusable components.
- Avoid duplicated markup.
- Keep server/client boundaries intentional.
- Never hard-code secrets.
- Use environment variables.
- Type all database responses.
- Handle null/empty states.
- Keep dependencies minimal.

## Before Finishing Any Feature
Ask:
- Does it solve the clinic's workflow?
- Is it mobile friendly?
- Is it accessible?
- Does it expose private data?
- Does it hurt SEO?
- Is there an unnecessary dependency?
- Is there a simpler implementation?

## Demo Standard
The final demo should feel like:
"premium private clinic website + practical internal operating system"

Not:
"template website + generic admin dashboard".
