"use client";

import { useRef, useTransition } from "react";
import { Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function NoteForm({
  entityId,
  action,
}: {
  entityId: string;
  action: (entityId: string, note: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={(formData) => {
        const note = String(formData.get("note") ?? "");
        startTransition(async () => {
          await action(entityId, note);
          formRef.current?.reset();
        });
      }}
      className="flex flex-col gap-3"
    >
      <Textarea
        name="note"
        required
        placeholder="Add a note for the team…"
        className="min-h-20 bg-white/5 text-cream-50 placeholder:text-slate-500"
      />
      <Button type="submit" size="sm" variant="secondaryOnDark" disabled={isPending} className="self-end">
        {isPending ? "Saving…" : "Add note"}
      </Button>
    </form>
  );
}
