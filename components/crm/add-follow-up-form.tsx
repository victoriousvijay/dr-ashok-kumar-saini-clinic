"use client";

import { useRef, useState, useTransition } from "react";
import { Label, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { createFollowUp } from "@/lib/crm/actions";

export function AddFollowUpForm({
  leadId,
  patientId,
}: {
  leadId?: string;
  patientId?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (done) {
    return <p className="text-sm text-teal-300">Follow-up scheduled.</p>;
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          await createFollowUp({
            leadId,
            patientId,
            dueAt: new Date(String(formData.get("due"))).toISOString(),
            type: String(formData.get("type") ?? ""),
            note: String(formData.get("note") ?? ""),
          });
          setDone(true);
        });
      }}
      className="flex flex-col gap-3"
    >
      <div>
        <Label htmlFor="fu-due" className="text-slate-300">
          Due date
        </Label>
        <Input id="fu-due" name="due" type="date" required className="bg-white/5 text-cream-50" />
      </div>
      <div>
        <Label htmlFor="fu-type" className="text-slate-300">
          Type
        </Label>
        <Input
          id="fu-type"
          name="type"
          placeholder="e.g. Callback, Reminder"
          className="bg-white/5 text-cream-50"
        />
      </div>
      <div>
        <Label htmlFor="fu-note" className="text-slate-300">
          Note (optional)
        </Label>
        <Input id="fu-note" name="note" className="bg-white/5 text-cream-50" />
      </div>
      <Button type="submit" size="sm" variant="secondaryOnDark" disabled={isPending} className="self-start">
        {isPending ? "Saving…" : "Add follow-up"}
      </Button>
    </form>
  );
}
