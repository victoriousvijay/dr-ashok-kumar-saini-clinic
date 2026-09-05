"use client";

import { useRef, useState, useTransition } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { createAppointment } from "@/lib/crm/actions";

const appointmentTypes = ["Initial Consultation", "Follow-up Visit", "Therapy Session"];

export function ScheduleAppointmentForm({
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
    return <p className="text-sm text-teal-300">Appointment scheduled.</p>;
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          await createAppointment({
            leadId,
            patientId,
            appointmentDate: String(formData.get("date")),
            appointmentTime: String(formData.get("time")),
            appointmentType: String(formData.get("type") ?? ""),
          });
          setDone(true);
        });
      }}
      className="grid grid-cols-2 gap-3"
    >
      <div>
        <Label htmlFor="appt-date" className="text-slate-300">
          Date
        </Label>
        <Input id="appt-date" name="date" type="date" required className="bg-white/5 text-cream-50" />
      </div>
      <div>
        <Label htmlFor="appt-time" className="text-slate-300">
          Time
        </Label>
        <Input id="appt-time" name="time" type="time" required className="bg-white/5 text-cream-50" />
      </div>
      <div className="col-span-2">
        <Label htmlFor="appt-type" className="text-slate-300">
          Type
        </Label>
        <Select id="appt-type" name="type" className="bg-white/5 text-cream-50">
          {appointmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" size="sm" variant="secondaryOnDark" disabled={isPending} className="col-span-2">
        {isPending ? "Scheduling…" : "Schedule appointment"}
      </Button>
    </form>
  );
}
