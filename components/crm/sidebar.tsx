"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarClock,
  BellRing,
  Stethoscope,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/crm/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/patients", label: "Patients", icon: UserRound },
  { href: "/crm/appointments", label: "Appointments", icon: CalendarClock },
  { href: "/crm/follow-ups", label: "Follow-ups", icon: BellRing },
  { href: "/crm/services", label: "Services", icon: Stethoscope },
  { href: "/crm/staff", label: "Staff", icon: ShieldCheck },
  { href: "/crm/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="CRM navigation"
      className="hidden w-64 shrink-0 border-r border-white/10 bg-ink-900 lg:flex lg:flex-col"
    >
      <div className="px-6 py-6">
        <p className="font-display text-lg text-cream-50">Clinic CRM</p>
        <p className="mt-1 text-xs text-slate-500">Staff only</p>
      </div>
      <ul className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-teal-600/15 text-teal-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-cream-50"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
