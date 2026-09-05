import { cn } from "@/lib/utils/cn";

const variants = {
  teal: "bg-teal-100 text-teal-700",
  gold: "bg-gold-100 text-gold-500",
  slate: "bg-slate-100 text-slate-700",
  onDark: "bg-white/10 text-cream-100 border border-white/20",
};

export function Badge({
  variant = "teal",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
