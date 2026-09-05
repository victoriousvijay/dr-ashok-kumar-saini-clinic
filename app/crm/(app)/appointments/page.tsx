import type { Metadata } from "next";
import Link from "next/link";
import { listAppointments } from "@/lib/crm/data";
import { updateAppointmentStatus } from "@/lib/crm/actions";
import { StatusSelect } from "@/components/crm/status-select";
import type { AppointmentStatus } from "@/types/database";

export const metadata: Metadata = {
  title: "Appointments",
  robots: { index: false, follow: false },
};

const statuses: AppointmentStatus[] = [
  "requested",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

export default async function CrmAppointmentsPage() {
  const appointments = await listAppointments();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Appointments</h1>
      <p className="mt-1 text-sm text-slate-400">{appointments.length} appointment(s)</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">For</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  No appointments yet.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => {
                const person = appt.patient ?? appt.lead;
                const href = appt.patient
                  ? `/crm/patients/${appt.patient.id}`
                  : appt.lead
                    ? `/crm/leads/${appt.lead.id}`
                    : undefined;
                return (
                  <tr key={appt.id} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-3 text-slate-200">{appt.appointment_date}</td>
                    <td className="px-4 py-3 text-slate-200">{appt.appointment_time}</td>
                    <td className="px-4 py-3">
                      {href ? (
                        <Link href={href} className="font-medium text-cream-50 hover:text-teal-300">
                          {person?.name ?? "—"}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{appt.appointment_type ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        id={appt.id}
                        value={appt.status}
                        options={statuses}
                        action={updateAppointmentStatus}
                        className="bg-white/5 text-cream-50"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
