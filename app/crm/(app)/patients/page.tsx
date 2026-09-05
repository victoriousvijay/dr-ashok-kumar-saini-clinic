import type { Metadata } from "next";
import Link from "next/link";
import { listPatients } from "@/lib/crm/data";

export const metadata: Metadata = {
  title: "Patients",
  robots: { index: false, follow: false },
};

export default async function CrmPatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const patients = await listPatients({ search: q });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-cream-50">Patients</h1>
          <p className="mt-1 text-sm text-slate-400">{patients.length} patient(s)</p>
        </div>
        <form className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search name or phone…"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-cream-50 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
          />
        </form>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {patients.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No patients yet. Convert a lead once they&apos;ve visited the clinic.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/crm/patients/${patient.id}`}
                      className="font-medium text-cream-50 hover:text-teal-300"
                    >
                      {patient.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{patient.phone}</td>
                  <td className="px-4 py-3 text-slate-300">{patient.email ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(patient.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
