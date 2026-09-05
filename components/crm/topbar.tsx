import { LogOut } from "lucide-react";
import { signOut } from "@/lib/crm/auth-actions";
import { Badge } from "@/components/ui/badge";

export function Topbar({
  email,
  role,
}: {
  email: string | null;
  role: string | null;
}) {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-ink-950 px-6 py-4">
      <div className="flex items-center gap-3">
        <p className="text-sm text-slate-300">{email ?? "Signed in"}</p>
        {role ? <Badge variant="onDark">{role}</Badge> : null}
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:text-cream-50"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </form>
    </header>
  );
}
