import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  AppointmentRow,
  FollowUpRow,
  LeadWithAssignee,
  NoteRow,
  PatientWithLead,
  ProfileRow,
} from "@/lib/crm/types";
import type { FollowUpStatus, LeadStatus } from "@/types/database";

export async function getDashboardStats() {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [
    { count: newLeads },
    { count: awaitingContact },
    { count: todaysAppointments },
    { count: upcomingAppointments },
    { count: followUpsDue },
    { data: statusCounts },
    { data: sourceCounts },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .in("status", ["new", "contacted"]),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("appointment_date", today),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("appointment_date", today)
      .in("status", ["requested", "confirmed"]),
    supabase
      .from("follow_ups")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")
      .lte("due_at", new Date().toISOString()),
    supabase.from("leads").select("status"),
    supabase.from("leads").select("source"),
  ]);

  const total = statusCounts?.length ?? 0;
  const converted = statusCounts?.filter((l) => l.status === "converted").length ?? 0;
  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  const sourceTally = new Map<string, number>();
  for (const row of sourceCounts ?? []) {
    const key = row.source?.trim() || "Unknown";
    sourceTally.set(key, (sourceTally.get(key) ?? 0) + 1);
  }
  const leadSources = [...sourceTally.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }));

  return {
    newLeads: newLeads ?? 0,
    awaitingContact: awaitingContact ?? 0,
    todaysAppointments: todaysAppointments ?? 0,
    upcomingAppointments: upcomingAppointments ?? 0,
    followUpsDue: followUpsDue ?? 0,
    conversionRate,
    leadSources,
  };
}

export async function listLeads(filters: { status?: string; search?: string } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("leads")
    .select("*, assignee:assigned_to(id, full_name)")
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status as LeadStatus);
  }
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as LeadWithAssignee[];
}

export async function getLeadById(id: string) {
  const supabase = await createClient();

  const [{ data: lead }, { data: notes }, { data: followUps }, { data: appointments }] =
    await Promise.all([
      supabase
        .from("leads")
        .select("*, assignee:assigned_to(id, full_name)")
        .eq("id", id)
        .maybeSingle(),
      supabase
        .from("notes")
        .select("*, author:author_id(id, full_name)")
        .eq("lead_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("follow_ups")
        .select("*")
        .eq("lead_id", id)
        .order("due_at", { ascending: true }),
      supabase
        .from("appointments")
        .select("*")
        .eq("lead_id", id)
        .order("appointment_date", { ascending: false }),
    ]);

  if (!lead) return null;

  return {
    lead: lead as unknown as LeadWithAssignee,
    notes: (notes ?? []) as unknown as (NoteRow & {
      author: Pick<ProfileRow, "id" | "full_name"> | null;
    })[],
    followUps: (followUps ?? []) as FollowUpRow[],
    appointments: (appointments ?? []) as AppointmentRow[],
  };
}

export async function listPatients(filters: { search?: string } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("patients")
    .select("*, lead:lead_id(id, status)")
    .order("created_at", { ascending: false });

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as PatientWithLead[];
}

export async function getPatientById(id: string) {
  const supabase = await createClient();

  const [{ data: patient }, { data: notes }, { data: followUps }, { data: appointments }] =
    await Promise.all([
      supabase.from("patients").select("*, lead:lead_id(id, status)").eq("id", id).maybeSingle(),
      supabase
        .from("notes")
        .select("*, author:author_id(id, full_name)")
        .eq("patient_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("follow_ups")
        .select("*")
        .eq("patient_id", id)
        .order("due_at", { ascending: true }),
      supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", id)
        .order("appointment_date", { ascending: false }),
    ]);

  if (!patient) return null;

  return {
    patient: patient as unknown as PatientWithLead,
    notes: (notes ?? []) as unknown as (NoteRow & {
      author: Pick<ProfileRow, "id" | "full_name"> | null;
    })[],
    followUps: (followUps ?? []) as FollowUpRow[],
    appointments: (appointments ?? []) as AppointmentRow[],
  };
}

export async function listAppointments(filters: { upcomingOnly?: boolean } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("appointments")
    .select(
      "*, patient:patient_id(id, name, phone), lead:lead_id(id, name, phone)"
    )
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (filters.upcomingOnly) {
    query = query.gte("appointment_date", new Date().toISOString().slice(0, 10));
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function listFollowUps(filters: { status?: string } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("follow_ups")
    .select(
      "*, patient:patient_id(id, name, phone), lead:lead_id(id, name, phone)"
    )
    .order("due_at", { ascending: true });

  if (filters.status) {
    query = query.eq("status", filters.status as FollowUpStatus);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function listServices() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}

export async function listStaff() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name");
  if (error) throw error;
  return (data ?? []) as ProfileRow[];
}

export async function listAssignableStaff() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name")
    .order("full_name");
  if (error) throw error;
  return data ?? [];
}
