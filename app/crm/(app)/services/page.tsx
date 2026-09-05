import type { Metadata } from "next";
import { listServices } from "@/lib/crm/data";
import { ServiceToggle } from "@/components/crm/service-toggle";

export const metadata: Metadata = {
  title: "Services",
  robots: { index: false, follow: false },
};

export default async function CrmServicesPage() {
  const services = await listServices();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Services</h1>
      <p className="mt-1 text-sm text-slate-400">
        Toggle which services appear on the public website and in the lead
        enquiry form.
      </p>

      <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div>
              <p className="font-medium text-cream-50">{service.name}</p>
              <p className="mt-1 text-sm text-slate-400">{service.description}</p>
            </div>
            <ServiceToggle id={service.id} active={service.active} />
          </div>
        ))}
      </div>
    </div>
  );
}
