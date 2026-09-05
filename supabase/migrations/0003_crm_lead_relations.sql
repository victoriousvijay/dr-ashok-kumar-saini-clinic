-- Allow notes and follow-ups to attach to a lead directly, not only a
-- patient, so CRM staff can log notes/follow-ups before a lead becomes a
-- patient (per the Lead drawer workflow in PLAN.md).

alter table notes add column if not exists lead_id uuid references leads(id);
alter table notes alter column patient_id drop not null;
alter table notes add constraint notes_patient_or_lead
  check (patient_id is not null or lead_id is not null);

alter table follow_ups add column if not exists lead_id uuid references leads(id);
alter table follow_ups alter column patient_id drop not null;
alter table follow_ups add constraint follow_ups_patient_or_lead
  check (patient_id is not null or lead_id is not null);
