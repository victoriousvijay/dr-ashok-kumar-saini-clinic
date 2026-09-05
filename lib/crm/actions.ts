"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AppointmentStatus, FollowUpStatus, LeadStatus, ProfileRole } from "@/types/database";

async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be signed in to do that.");
  return { supabase, userId: user.id };
}

async function requireAdmin() {
  const { supabase, userId } = await requireUserId();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  if (profile?.role !== "admin") {
    throw new Error("Only clinic admins can do that.");
  }
  return { supabase, userId };
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const { supabase } = await requireUserId();
  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", leadId);
  if (error) throw error;
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${leadId}`);
  revalidatePath("/crm/dashboard");
}

export async function assignLead(leadId: string, assigneeId: string | null) {
  const { supabase } = await requireUserId();
  const { error } = await supabase
    .from("leads")
    .update({ assigned_to: assigneeId, updated_at: new Date().toISOString() })
    .eq("id", leadId);
  if (error) throw error;
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${leadId}`);
}

export async function addLeadNote(leadId: string, note: string) {
  const trimmed = note.trim();
  if (!trimmed) return;
  const { supabase, userId } = await requireUserId();
  const { error } = await supabase
    .from("notes")
    .insert({ lead_id: leadId, author_id: userId, note: trimmed });
  if (error) throw error;
  revalidatePath(`/crm/leads/${leadId}`);
}

export async function addPatientNote(patientId: string, note: string) {
  const trimmed = note.trim();
  if (!trimmed) return;
  const { supabase, userId } = await requireUserId();
  const { error } = await supabase
    .from("notes")
    .insert({ patient_id: patientId, author_id: userId, note: trimmed });
  if (error) throw error;
  revalidatePath(`/crm/patients/${patientId}`);
}

export async function convertLeadToPatient(leadId: string) {
  const { supabase } = await requireUserId();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("id, name, phone, email")
    .eq("id", leadId)
    .maybeSingle();
  if (leadError) throw leadError;
  if (!lead) throw new Error("Lead not found.");

  const { data: patient, error: insertError } = await supabase
    .from("patients")
    .insert({ lead_id: lead.id, name: lead.name, phone: lead.phone, email: lead.email })
    .select("id")
    .single();
  if (insertError) throw insertError;

  const { error: statusError } = await supabase
    .from("leads")
    .update({ status: "converted", updated_at: new Date().toISOString() })
    .eq("id", leadId);
  if (statusError) throw statusError;

  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${leadId}`);
  revalidatePath("/crm/patients");
  return patient.id as string;
}

export async function createAppointment(input: {
  leadId?: string;
  patientId?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType?: string;
  notes?: string;
}) {
  const { supabase } = await requireUserId();
  const { error } = await supabase.from("appointments").insert({
    lead_id: input.leadId ?? null,
    patient_id: input.patientId ?? null,
    appointment_date: input.appointmentDate,
    appointment_time: input.appointmentTime,
    appointment_type: input.appointmentType || null,
    notes: input.notes || null,
    status: "requested",
  });
  if (error) throw error;
  revalidatePath("/crm/appointments");
  revalidatePath("/crm/dashboard");
  if (input.leadId) revalidatePath(`/crm/leads/${input.leadId}`);
  if (input.patientId) revalidatePath(`/crm/patients/${input.patientId}`);
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const { supabase } = await requireUserId();
  const { error } = await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/crm/appointments");
  revalidatePath("/crm/dashboard");
}

export async function createFollowUp(input: {
  leadId?: string;
  patientId?: string;
  dueAt: string;
  type?: string;
  note?: string;
}) {
  const { supabase } = await requireUserId();
  const { error } = await supabase.from("follow_ups").insert({
    lead_id: input.leadId ?? null,
    patient_id: input.patientId ?? null,
    due_at: input.dueAt,
    type: input.type || null,
    note: input.note || null,
    status: "pending",
  });
  if (error) throw error;
  revalidatePath("/crm/follow-ups");
  revalidatePath("/crm/dashboard");
  if (input.leadId) revalidatePath(`/crm/leads/${input.leadId}`);
  if (input.patientId) revalidatePath(`/crm/patients/${input.patientId}`);
}

export async function updateFollowUpStatus(id: string, status: FollowUpStatus) {
  const { supabase } = await requireUserId();
  const { error } = await supabase
    .from("follow_ups")
    .update({
      status,
      completed_at: status === "completed" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/crm/follow-ups");
  revalidatePath("/crm/dashboard");
}

export async function setServiceActive(id: string, active: boolean) {
  const { supabase } = await requireUserId();
  const { error } = await supabase
    .from("services")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/crm/services");
}

export async function inviteStaff(input: {
  email: string;
  fullName: string;
  role: ProfileRole;
}) {
  await requireAdmin();

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(input.email);
  if (error) throw error;

  const userId = data.user?.id;
  if (!userId) throw new Error("Invite succeeded but no user id was returned.");

  const { error: profileError } = await admin.from("profiles").insert({
    id: userId,
    full_name: input.fullName,
    role: input.role,
  });
  if (profileError) throw profileError;

  revalidatePath("/crm/staff");
}
