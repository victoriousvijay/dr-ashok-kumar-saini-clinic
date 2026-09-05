import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const kpis = [
  { label: "New Leads", value: "—" },
  { label: "Awaiting Contact", value: "—" },
  { label: "Today's Appointments", value: "—" },
  { label: "Upcoming Appointments", value: "—" },
  { label: "Follow-ups Due", value: "—" },
  { label: "Conversion Rate", value: "—" },
];

export default function CrmDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-400">
        Lead, appointment and follow-up metrics will appear here once the
        clinic&apos;s Supabase project and data are connected.
      </p>

      {!isSupabaseConfigured ? (
        <p className="mt-6 max-w-xl rounded-xl border border-gold-500/30 bg-gold-500/10 p-4 text-sm text-gold-100">
          Supabase is not configured for this environment. KPIs below are
          placeholders until NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {kpi.label}
            </p>
            <p className="mt-2 font-display text-3xl text-cream-50">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
