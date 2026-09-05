/**
 * Generated from the live Supabase project (`npx supabase gen types typescript
 * --project-id xexkkmvhhxqkwqnfcdbq`). Re-run that command and overwrite this
 * file whenever supabase/migrations/*.sql changes the schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string;
          actor_id: string | null;
          created_at: string;
          entity_id: string;
          entity_type: string;
          id: string;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          created_at?: string;
          entity_id: string;
          entity_type: string;
          id?: string;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          created_at?: string;
          entity_id?: string;
          entity_type?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activity_log_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      appointments: {
        Row: {
          appointment_date: string;
          appointment_time: string;
          appointment_type: string | null;
          assigned_to: string | null;
          created_at: string;
          id: string;
          lead_id: string | null;
          notes: string | null;
          patient_id: string | null;
          status: AppointmentStatus;
          updated_at: string;
        };
        Insert: {
          appointment_date: string;
          appointment_time: string;
          appointment_type?: string | null;
          assigned_to?: string | null;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          notes?: string | null;
          patient_id?: string | null;
          status?: AppointmentStatus;
          updated_at?: string;
        };
        Update: {
          appointment_date?: string;
          appointment_time?: string;
          appointment_type?: string | null;
          assigned_to?: string | null;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          notes?: string | null;
          patient_id?: string | null;
          status?: AppointmentStatus;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      follow_ups: {
        Row: {
          assigned_to: string | null;
          completed_at: string | null;
          created_at: string;
          due_at: string;
          id: string;
          note: string | null;
          patient_id: string;
          status: FollowUpStatus;
          type: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          completed_at?: string | null;
          created_at?: string;
          due_at: string;
          id?: string;
          note?: string | null;
          patient_id: string;
          status?: FollowUpStatus;
          type?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          completed_at?: string | null;
          created_at?: string;
          due_at?: string;
          id?: string;
          note?: string | null;
          patient_id?: string;
          status?: FollowUpStatus;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "follow_ups_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follow_ups_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          assigned_to: string | null;
          created_at: string;
          email: string | null;
          enquiry_message: string | null;
          id: string;
          interested_service: string | null;
          name: string;
          phone: string;
          source: string | null;
          status: LeadStatus;
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          created_at?: string;
          email?: string | null;
          enquiry_message?: string | null;
          id?: string;
          interested_service?: string | null;
          name: string;
          phone: string;
          source?: string | null;
          status?: LeadStatus;
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          created_at?: string;
          email?: string | null;
          enquiry_message?: string | null;
          id?: string;
          interested_service?: string | null;
          name?: string;
          phone?: string;
          source?: string | null;
          status?: LeadStatus;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notes: {
        Row: {
          author_id: string;
          created_at: string;
          id: string;
          note: string;
          patient_id: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          created_at?: string;
          id?: string;
          note: string;
          patient_id: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          created_at?: string;
          id?: string;
          note?: string;
          patient_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notes_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      patients: {
        Row: {
          address: string | null;
          created_at: string;
          date_of_birth: string | null;
          email: string | null;
          emergency_contact: string | null;
          gender: string | null;
          id: string;
          lead_id: string | null;
          name: string;
          phone: string;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          email?: string | null;
          emergency_contact?: string | null;
          gender?: string | null;
          id?: string;
          lead_id?: string | null;
          name: string;
          phone: string;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          email?: string | null;
          emergency_contact?: string | null;
          gender?: string | null;
          id?: string;
          lead_id?: string | null;
          name?: string;
          phone?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "patients_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string;
          id: string;
          phone: string | null;
          role: ProfileRole;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          full_name: string;
          id: string;
          phone?: string | null;
          role: ProfileRole;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string;
          id?: string;
          phone?: string | null;
          role?: ProfileRole;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          active: boolean;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          slug: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
