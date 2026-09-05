"use client";

import { useRef, useState, useTransition } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { inviteStaff } from "@/lib/crm/actions";
import type { ProfileRole } from "@/types/database";

const roles: ProfileRole[] = ["staff", "doctor", "admin"];

export function InviteStaffForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          try {
            await inviteStaff({
              email: String(formData.get("email")),
              fullName: String(formData.get("fullName")),
              role: String(formData.get("role")) as ProfileRole,
            });
            formRef.current?.reset();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not send invite.");
          }
        });
      }}
      className="grid gap-4 sm:grid-cols-3"
    >
      <div>
        <Label htmlFor="invite-name">Full name</Label>
        <Input id="invite-name" name="fullName" required />
      </div>
      <div>
        <Label htmlFor="invite-email">Email</Label>
        <Input id="invite-email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="invite-role">Role</Label>
        <Select id="invite-role" name="role" defaultValue="staff">
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </div>
      {error ? <p className="sm:col-span-3 text-sm text-red-600">{error}</p> : null}
      <Button type="submit" size="sm" disabled={isPending} className="sm:col-span-3 sm:w-fit">
        {isPending ? "Sending invite…" : "Send invite"}
      </Button>
    </form>
  );
}
