import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants = {
  primary:
    "bg-teal-600 text-white shadow-[0_8px_24px_-8px_rgba(14,122,115,0.55)] hover:bg-teal-700 hover:shadow-[0_10px_28px_-6px_rgba(14,122,115,0.6)] active:scale-[0.98]",
  onDark:
    "bg-cream-50 text-ink-950 hover:bg-white active:scale-[0.98] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]",
  secondary:
    "bg-transparent text-ink-950 border border-slate-300 hover:border-teal-500 hover:text-teal-700 active:scale-[0.98]",
  secondaryOnDark:
    "bg-white/5 text-cream-50 border border-white/25 hover:border-white/50 hover:bg-white/10 active:scale-[0.98]",
  ghost: "bg-transparent text-ink-950 hover:bg-slate-100 active:scale-[0.98]",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-7 py-3.5",
};

type ButtonOwnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
