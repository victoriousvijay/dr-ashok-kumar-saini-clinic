import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function CrmSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Settings</h1>
      <p className="mt-1 text-sm text-slate-400">
        Clinic information shown on the public website. Update{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5">lib/seo/site.ts</code>{" "}
        and redeploy to change these values.
      </p>

      <dl className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Clinic name</dt>
          <dd className="mt-1 text-sm text-cream-50">{siteConfig.shortName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Address</dt>
          <dd className="mt-1 text-sm text-cream-50">
            {siteConfig.address.line1}, {siteConfig.address.line2}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Timings</dt>
          <dd className="mt-1 space-y-1 text-sm text-cream-50">
            {siteConfig.timings.map((slot) => (
              <p key={slot.hours}>
                {slot.days}: {slot.hours}
              </p>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Contact</dt>
          <dd className="mt-1 text-sm text-cream-50">{siteConfig.contact.phone}</dd>
        </div>
      </dl>
    </div>
  );
}
