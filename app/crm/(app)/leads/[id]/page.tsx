import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadById, listAssignableStaff } from "@/lib/crm/data";
import { updateLeadStatus, addLeadNote } from "@/lib/crm/actions";
import { StatusSelect } from "@/components/crm/status-select";
import { AssignSelect } from "@/components/crm/assign-select";
import { NoteForm } from "@/components/crm/note-form";
import { StatusBadge } from "@/components/crm/status-badge";
import { ScheduleAppointmentForm } from "@/components/crm/schedule-appointment-form";
import { AddFollowUpForm } from "@/components/crm/add-follow-up-form";
import { ConvertToPatientButton } from "@/components/crm/convert-to-patient-button";
import type { LeadStatus } from "@/types/database";

export const metadata: Metadata = {
  title: "Lead Detail",
  robots: { index: false, follow: false },
};

const statuses: LeadStatus[] = [
  "new",
  "contacted",
  "appointment_scheduled",
  "visited",
  "follow_up",
  "converted",
  "lost",
];

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [result, staff] = await Promise.all([getLeadById(id), listAssignableStaff()]);
  if (!result) notFound();

  const { lead, notes, followUps, appointments } = result;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
      <Link href="/crm/leads" className="text-sm text-teal-300 hover:underline">
        ← Back to leads
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-cream-50">{lead.name}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {lead.phone} {lead.email ? `· ${lead.email}` : ""}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Enquiry</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-500">Interested service</dt>
                <dd className="mt-1 text-sm text-cream-50">{lead.interested_service ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Source</dt>
                <dd className="mt-1 text-sm text-cream-50">{lead.source ?? "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-500">Message</dt>
                <dd className="mt-1 text-sm text-slate-300">{lead.enquiry_message ?? "—"}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Notes</h2>
            <div className="mt-4 space-y-4">
              {notes.length === 0 ? (
                <p className="text-sm text-slate-500">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="rounded-xl bg-white/5 p-4 text-sm text-slate-200">
                    <p>{note.note}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {note.author?.full_name ?? "Staff"} ·{" "}
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
              <NoteForm entityId={lead.id} action={addLeadNote} />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Appointments
            </h2>
            <div className="mt-4 space-y-2">
              {appointments.length === 0 ? (
                <p className="text-sm text-slate-500">No appointments yet.</p>
              ) : (
                appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"
                  >
                    <span className="text-slate-200">
                      {appt.appointment_date} at {appt.appointment_time}
                    </span>
                    <StatusBadge status={appt.status} />
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <ScheduleAppointmentForm leadId={lead.id} />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Follow-ups
            </h2>
            <div className="mt-4 space-y-2">
              {followUps.length === 0 ? (
                <p className="text-sm text-slate-500">No follow-ups scheduled.</p>
              ) : (
                followUps.map((fu) => (
                  <div
                    key={fu.id}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"
                  >
                    <span className="text-slate-200">
                      {new Date(fu.due_at).toLocaleDateString()} — {fu.type ?? "Follow-up"}
                    </span>
                    <StatusBadge status={fu.status} />
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <AddFollowUpForm leadId={lead.id} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</h2>
            <div className="mt-3">
              <StatusSelect
                id={lead.id}
                value={lead.status}
                options={statuses}
                action={updateLeadStatus}
                className="bg-white/5 text-cream-50"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Assigned to
            </h2>
            <div className="mt-3">
              <AssignSelect leadId={lead.id} assignedTo={lead.assigned_to} staff={staff} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Patient record
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Create a patient record once this lead has visited the clinic.
            </p>
            <div className="mt-3">
              <ConvertToPatientButton leadId={lead.id} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
