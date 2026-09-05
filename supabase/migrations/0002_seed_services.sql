-- Seeds the services table with the verified service list from CONTENT.md /
-- lib/data/services.ts, so the public services pages have a matching
-- reference row in the database once the CRM starts managing them.

insert into services (name, slug, description, active) values
  ('Psychiatric Consultation', 'psychiatric-consultation', 'Comprehensive psychiatric evaluation and ongoing consultation for mental health concerns.', true),
  ('Child & Adolescent Psychiatric OPD', 'child-adolescent-psychiatry', 'Dedicated psychiatric consultation for children and adolescents, including a child guidance clinic.', true),
  ('Geriatric Psychiatric Consultation', 'geriatric-psychiatry', 'Mental health consultation focused on the needs of older adults.', true),
  ('Drug De-addiction Services', 'drug-de-addiction', 'Consultation and support for substance use and de-addiction concerns.', true),
  ('Sleep Clinic', 'sleep-clinic', 'Consultation for sleep-related difficulties.', true),
  ('Sexual Disorder Clinic (Male, Female)', 'sexual-disorder-clinic', 'Confidential consultation for sexual health concerns for men and women.', true),
  ('Headache Clinic', 'headache-clinic', 'Consultation for recurring headache concerns with a mental-health-informed approach.', true),
  ('Psychotherapy & Counselling', 'psychotherapy-counselling', 'Talking-therapy approaches including CBT, ERP, IPSRT, IPT and MET, alongside counselling.', true)
on conflict (slug) do nothing;
