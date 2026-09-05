/**
 * Hand-authored skeleton matching SUPABASE_SCHEMA.md. Once a live Supabase
 * project exists, replace this file by running:
 *   npx supabase gen types typescript --project-id <id> > types/database.ts
 */

export type ProfileRole = "admin" | "doctor" | "staff";

export type LeadStatus =
  | "new"
  | "contacted"
  | "appointment_scheduled"
  | "visited"
  | "follow_up"
  | "converted"
  | "lost";

export type AppointmentStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type FollowUpStatus = "pending" | "completed" | "cancelled";

export type ProfileRow = {
  id: string;
  full_name: string;
  role: ProfileRole;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  source: string | null;
  interested_service: string | null;
  status: LeadStatus;
  enquiry_message: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};

export type PatientRow = {
  id: string;
  lead_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  emergency_contact: string | null;
  created_at: string;
  updated_at: string;
};

export type AppointmentRow = {
  id: string;
  patient_id: string | null;
  lead_id: string | null;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string | null;
  status: AppointmentStatus;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type FollowUpRow = {
  id: string;
  patient_id: string;
  due_at: string;
  type: string | null;
  status: FollowUpStatus;
  note: string | null;
  assigned_to: string | null;
  completed_at: string | null;
  created_at: string;
};

export type NoteRow = {
  id: string;
  patient_id: string;
  author_id: string;
  note: string;
  created_at: string;
  updated_at: string;
};

export type ActivityLogRow = {
  id: string;
  actor_id: string | null;
  entity_type: string;
  entity_id: string;
  action: string;
  created_at: string;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & Pick<ProfileRow, "id" | "full_name" | "role">;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      services: {
        Row: ServiceRow;
        Insert: Partial<ServiceRow> & Pick<ServiceRow, "name" | "slug">;
        Update: Partial<ServiceRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: Partial<LeadRow> & Pick<LeadRow, "name" | "phone">;
        Update: Partial<LeadRow>;
        Relationships: [];
      };
      patients: {
        Row: PatientRow;
        Insert: Partial<PatientRow> & Pick<PatientRow, "name" | "phone">;
        Update: Partial<PatientRow>;
        Relationships: [];
      };
      appointments: {
        Row: AppointmentRow;
        Insert: Partial<AppointmentRow> &
          Pick<AppointmentRow, "appointment_date" | "appointment_time">;
        Update: Partial<AppointmentRow>;
        Relationships: [];
      };
      follow_ups: {
        Row: FollowUpRow;
        Insert: Partial<FollowUpRow> & Pick<FollowUpRow, "patient_id" | "due_at">;
        Update: Partial<FollowUpRow>;
        Relationships: [];
      };
      notes: {
        Row: NoteRow;
        Insert: Partial<NoteRow> & Pick<NoteRow, "patient_id" | "author_id" | "note">;
        Update: Partial<NoteRow>;
        Relationships: [];
      };
      activity_log: {
        Row: ActivityLogRow;
        Insert: Partial<ActivityLogRow> &
          Pick<ActivityLogRow, "entity_type" | "entity_id" | "action">;
        Update: Partial<ActivityLogRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
