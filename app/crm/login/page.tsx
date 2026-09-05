import type { Metadata } from "next";
import { LoginForm } from "@/components/crm/login-form";

export const metadata: Metadata = {
  title: "Staff Login",
  robots: { index: false, follow: false },
};

export default function CrmLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ink-950 px-6 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-ink-900 p-8">
        <h1 className="font-display text-2xl text-cream-50">Staff Login</h1>
        <p className="mt-2 text-sm text-slate-400">
          Private clinic portal. Not for patient use.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
