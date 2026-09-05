import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPatientById } from "@/lib/crm/data";
import { addPatientNote } from "@/lib/crm/actions";
import { NoteForm } from "@/components/crm/note-form";
import { StatusBadge } from "@/components/crm/status-badge";
import { ScheduleAppointmentForm } from "@/components/crm/schedule-appointment-form";
import { AddFollowUpForm } from "@/components/crm/add-follow-up-form";

export const metadata: Metadata = {
  title: "Patient Detail",
  robots: { index: false, follow: false },
};

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPatientById(id);
  if (!result) notFound();

  const { patient, notes, followUps, appointments } = result;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
      <Link href="/crm/patients" className="text-sm text-teal-300 hover:underline">
        ← Back to patients
      </Link>

      <div className="mt-4">
        <h1 className="font-display text-2xl text-cream-50">{patient.name}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {patient.phone} {patient.email ? `· ${patient.email}` : ""}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Basic Information
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-500">Date of birth</dt>
                <dd className="mt-1 text-sm text-cream-50">{patient.date_of_birth ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Gender</dt>
                <dd className="mt-1 text-sm text-cream-50">{patient.gender ?? "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-500">Address</dt>
                <dd className="mt-1 text-sm text-slate-300">{patient.address ?? "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-500">Emergency contact</dt>
                <dd className="mt-1 text-sm text-slate-300">{patient.emergency_contact ?? "—"}</dd>
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
              <NoteForm entityId={patient.id} action={addPatientNote} />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Appointment History
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
              <ScheduleAppointmentForm patientId={patient.id} />
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
              <AddFollowUpForm patientId={patient.id} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Activity Timeline
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {notes.length} note(s) · {appointments.length} appointment(s) ·{" "}
              {followUps.length} follow-up(s)
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
