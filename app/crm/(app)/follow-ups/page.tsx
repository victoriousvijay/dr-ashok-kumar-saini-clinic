import type { Metadata } from "next";
import Link from "next/link";
import { listFollowUps } from "@/lib/crm/data";
import { updateFollowUpStatus } from "@/lib/crm/actions";
import { StatusSelect } from "@/components/crm/status-select";
import type { FollowUpStatus } from "@/types/database";

export const metadata: Metadata = {
  title: "Follow-ups",
  robots: { index: false, follow: false },
};

const statuses: FollowUpStatus[] = ["pending", "completed", "cancelled"];

export default async function CrmFollowUpsPage() {
  const followUps = await listFollowUps();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Follow-ups</h1>
      <p className="mt-1 text-sm text-slate-400">{followUps.length} follow-up(s)</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">For</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {followUps.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  No follow-ups scheduled.
                </td>
              </tr>
            ) : (
              followUps.map((fu) => {
                const person = fu.patient ?? fu.lead;
                const href = fu.patient
                  ? `/crm/patients/${fu.patient.id}`
                  : fu.lead
                    ? `/crm/leads/${fu.lead.id}`
                    : undefined;
                return (
                  <tr key={fu.id} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-3 text-slate-200">
                      {new Date(fu.due_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {href ? (
                        <Link href={href} className="font-medium text-cream-50 hover:text-teal-300">
                          {person?.name ?? "—"}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{fu.type ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-300">{fu.note ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        id={fu.id}
                        value={fu.status}
                        options={statuses}
                        action={updateFollowUpStatus}
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
