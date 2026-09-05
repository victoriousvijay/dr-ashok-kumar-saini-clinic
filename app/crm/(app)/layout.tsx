import { redirect } from "next/navigation";
import { Sidebar } from "@/components/crm/sidebar";
import { Topbar } from "@/components/crm/topbar";
import { getCurrentProfile } from "@/lib/crm/current-user";
import { isSupabaseConfigured } from "@/lib/supabase/env";

// The CRM reads the auth session and live data on every request; it must
// never be statically prerendered (which would also crash the build when
// Supabase env vars aren't set yet, since that check runs before Next can
// detect the dynamic cookies() call and opt out of prerendering itself).
export const dynamic = "force-dynamic";

export default async function CrmAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="max-w-md rounded-2xl border border-gold-500/30 bg-gold-500/10 p-6 text-sm text-gold-100">
          Supabase is not configured for this environment, so the CRM cannot
          authenticate staff yet. Set NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY to enable it.
        </div>
      </div>
    );
  }

  const current = await getCurrentProfile();
  if (!current) {
    redirect("/crm/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar email={current.email} role={current.profile?.role ?? null} />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
