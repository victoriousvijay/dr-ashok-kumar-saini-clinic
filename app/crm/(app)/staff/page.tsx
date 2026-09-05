import type { Metadata } from "next";
import { listStaff } from "@/lib/crm/data";
import { getCurrentProfile } from "@/lib/crm/current-user";
import { InviteStaffForm } from "@/components/crm/invite-staff-form";

export const metadata: Metadata = {
  title: "Staff",
  robots: { index: false, follow: false },
};

export default async function CrmStaffPage() {
  const [staff, current] = await Promise.all([listStaff(), getCurrentProfile()]);
  const isAdmin = current?.profile?.role === "admin";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
      <h1 className="font-display text-2xl text-cream-50">Staff</h1>
      <p className="mt-1 text-sm text-slate-400">{staff.length} staff member(s)</p>

      <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
        {staff.length === 0 ? (
          <p className="px-5 py-10 text-center text-slate-500">No staff profiles yet.</p>
        ) : (
          staff.map((member) => (
            <div key={member.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-cream-50">{member.full_name}</p>
                <p className="text-sm text-slate-400">{member.phone ?? "No phone on file"}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-cream-100">
                {member.role}
              </span>
            </div>
          ))
        )}
      </div>

      {isAdmin ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-display text-lg text-cream-50">Invite staff</h2>
          <p className="mt-1 text-sm text-slate-400">
            Sends an email invite. The new staff member sets their own password
            and gets a profile created automatically.
          </p>
          <div className="mt-5">
            <InviteStaffForm />
          </div>
        </div>
      ) : (
        <p className="mt-10 text-sm text-slate-500">
          Only clinic admins can invite new staff.
        </p>
      )}
    </div>
  );
}
