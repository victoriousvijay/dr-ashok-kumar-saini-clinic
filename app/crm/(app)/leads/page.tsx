import type { Metadata } from "next";
import Link from "next/link";
import { listLeads } from "@/lib/crm/data";
import { StatusBadge } from "@/components/crm/status-badge";
import type { LeadStatus } from "@/types/database";

export const metadata: Metadata = {
  title: "Leads",
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

export default async function CrmLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const leads = await listLeads({ status, search: q });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-cream-50">Leads</h1>
          <p className="mt-1 text-sm text-slate-400">{leads.length} lead(s)</p>
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

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/crm/leads"
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
            !status ? "bg-teal-600 text-white" : "bg-white/5 text-slate-300"
          }`}
        >
          All
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/crm/leads?status=${s}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
              status === s ? "bg-teal-600 text-white" : "bg-white/5 text-slate-300"
            }`}
          >
            {s.replace(/_/g, " ")}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No leads yet. New enquiries from the public website will appear here.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="font-medium text-cream-50 hover:text-teal-300"
                    >
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{lead.phone}</td>
                  <td className="px-4 py-3 text-slate-300">{lead.interested_service ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{lead.source ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-300">{lead.assignee?.full_name ?? "Unassigned"}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(lead.created_at).toLocaleDateString()}
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
