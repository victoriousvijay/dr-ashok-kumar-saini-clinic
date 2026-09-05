import { cn } from "@/lib/utils/cn";

const palette: Record<string, string> = {
  new: "bg-teal-100 text-teal-700",
  contacted: "bg-gold-100 text-gold-500",
  appointment_scheduled: "bg-blue-100 text-blue-700",
  visited: "bg-purple-100 text-purple-700",
  follow_up: "bg-amber-100 text-amber-700",
  converted: "bg-green-100 text-green-700",
  lost: "bg-slate-200 text-slate-600",
  requested: "bg-slate-200 text-slate-600",
  confirmed: "bg-teal-100 text-teal-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  no_show: "bg-red-100 text-red-700",
  pending: "bg-gold-100 text-gold-500",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        palette[status] ?? "bg-slate-200 text-slate-600"
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
