"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { convertLeadToPatient } from "@/lib/crm/actions";

export function ConvertToPatientButton({ leadId }: { leadId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      type="button"
      size="sm"
      variant="secondaryOnDark"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const patientId = await convertLeadToPatient(leadId);
          router.push(`/crm/patients/${patientId}`);
        });
      }}
    >
      {isPending ? "Converting…" : "Create patient record"}
    </Button>
  );
}
