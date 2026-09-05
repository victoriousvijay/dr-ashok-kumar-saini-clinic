"use client";

import { useTransition } from "react";
import { Select } from "@/components/ui/field";
import { assignLead } from "@/lib/crm/actions";

export function AssignSelect({
  leadId,
  assignedTo,
  staff,
}: {
  leadId: string;
  assignedTo: string | null;
  staff: { id: string; full_name: string }[];
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      aria-label="Assigned to"
      value={assignedTo ?? ""}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value || null;
        startTransition(() => {
          assignLead(leadId, next);
        });
      }}
    >
      <option value="">Unassigned</option>
      {staff.map((member) => (
        <option key={member.id} value={member.id}>
          {member.full_name}
        </option>
      ))}
    </Select>
  );
}
