"use client";

import { useTransition } from "react";
import { setServiceActive } from "@/lib/crm/actions";

export function ServiceToggle({ id, active }: { id: string; active: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-sm text-slate-300">
      <input
        type="checkbox"
        checked={active}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.checked;
          startTransition(() => {
            setServiceActive(id, next);
          });
        }}
        className="h-4 w-4 rounded border-slate-500 bg-white/10 text-teal-500 focus:ring-teal-500"
      />
      {active ? "Active" : "Inactive"}
    </label>
  );
}
