import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,32,0.04),0_18px_40px_-24px_rgba(16,24,32,0.18)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(16,24,32,0.04),0_24px_48px_-20px_rgba(16,24,32,0.24)]",
        className
      )}
      {...props}
    />
  );
}
