import type { Database } from "@/types/database";

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type PatientRow = Database["public"]["Tables"]["patients"]["Row"];
export type AppointmentRow = Database["public"]["Tables"]["appointments"]["Row"];
export type FollowUpRow = Database["public"]["Tables"]["follow_ups"]["Row"];
export type NoteRow = Database["public"]["Tables"]["notes"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

export type LeadWithAssignee = LeadRow & {
  assignee: Pick<ProfileRow, "id" | "full_name"> | null;
};

export type PatientWithLead = PatientRow & {
  lead: Pick<LeadRow, "id" | "status"> | null;
};
