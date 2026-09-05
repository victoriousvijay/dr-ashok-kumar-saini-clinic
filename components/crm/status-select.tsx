"use client";

import { useTransition } from "react";
import { Select } from "@/components/ui/field";

export function StatusSelect<T extends string>({
  id,
  value,
  options,
  action,
  className,
}: {
  id: string;
  value: T;
  options: readonly T[];
  action: (id: string, value: T) => Promise<void>;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      aria-label="Status"
      className={className}
      value={value}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as T;
        startTransition(() => {
          action(id, next);
        });
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option.replace(/_/g, " ")}
        </option>
      ))}
    </Select>
  );
}
