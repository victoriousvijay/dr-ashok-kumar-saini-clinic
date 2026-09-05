import type { Metadata } from "next";
import { getDashboardStats } from "@/lib/crm/data";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function CrmDashboardPage() {
  const stats = await getDashboardStats();

  const kpis = [
    { label: "New Leads", value: stats.newLeads },
    { label: "Awaiting Contact", value: stats.awaitingContact },
    { label: "Today's Appointments", value: stats.todaysAppointments },
    { label: "Upcoming Appointments", value: stats.upcomingAppointments },
    { label: "Follow-ups Due", value: stats.followUpsDue },
    { label: "Conversion Rate", value: `${stats.conversionRate}%` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-400">
        A live snapshot of leads, appointments and follow-ups.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">{kpi.label}</p>
            <p className="mt-2 font-display text-3xl text-cream-50">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Lead Sources
        </h2>
        {stats.leadSources.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No leads yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {stats.leadSources.map((row) => (
              <li
                key={row.source}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
              >
                <span className="text-slate-300">{row.source}</span>
                <span className="font-medium text-cream-50">{row.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
