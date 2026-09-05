"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label, Input, Textarea, Select, FieldError } from "@/components/ui/field";
import { leadSchema, contactMethods, type LeadInput } from "@/lib/validation/lead";
import { services } from "@/lib/data/services";

type FormState = {
  name: string;
  phone: string;
  email: string;
  interestedService: string;
  preferredContact: (typeof contactMethods)[number] | "";
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  interestedService: "",
  preferredContact: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const formId = useId();
  const [values, setValues] = useState<FormState>({
    ...initialState,
    interestedService: defaultService ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const payload: LeadInput = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      interestedService: values.interestedService,
      preferredContact: values.preferredContact || undefined,
      message: values.message,
      source: "website",
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setServerError(
          body?.error ?? "Something went wrong. Please try again or call the clinic."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialState);
    } catch {
      setServerError("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-3xl border border-teal-200 bg-teal-50 p-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-teal-600" aria-hidden="true" />
        <p className="font-display text-xl text-ink-950">
          Thank you — your enquiry has been received.
        </p>
        <p className="max-w-sm text-sm text-slate-600">
          The clinic team will contact you shortly to confirm next steps.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${formId}-name`}>Full name</Label>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <FieldError>{errors.name}</FieldError>
        </div>

        <div>
          <Label htmlFor={`${formId}-phone`}>Phone number</Label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <FieldError>{errors.phone}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${formId}-email`}>Email (optional)</Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <FieldError>{errors.email}</FieldError>
        </div>

        <div>
          <Label htmlFor={`${formId}-contact`}>Preferred contact method</Label>
          <Select
            id={`${formId}-contact`}
            name="preferredContact"
            value={values.preferredContact}
            onChange={(e) =>
              update("preferredContact", e.target.value as FormState["preferredContact"])
            }
          >
            <option value="">No preference</option>
            {contactMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor={`${formId}-service`}>Service you&apos;re interested in</Label>
        <Select
          id={`${formId}-service`}
          name="interestedService"
          value={values.interestedService}
          onChange={(e) => update("interestedService", e.target.value)}
        >
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor={`${formId}-message`}>Message (optional)</Label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          placeholder="Share anything that will help the clinic team prepare for your consultation."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
        <FieldError>{errors.message}</FieldError>
      </div>

      {serverError ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Submit Enquiry"
        )}
      </Button>
    </form>
  );
}
