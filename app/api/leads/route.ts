import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { leadSchema } from "@/lib/validation/lead";
import type { Database } from "@/types/database";

/**
 * Public enquiry endpoint. Uses the service role key (server-only) so the
 * insert can be tightly scoped in Supabase RLS to this endpoint's logic
 * rather than granting anonymous clients direct table access.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Lead enquiry received but Supabase is not configured.", {
      name: parsed.data.name,
      interestedService: parsed.data.interestedService,
    });
    return NextResponse.json(
      {
        error:
          "Enquiries cannot be saved yet — the clinic team has not connected the database. Please call the clinic directly in the meantime.",
      },
      { status: 503 }
    );
  }

  const supabase = createClient<Database>(supabaseUrl, serviceRoleKey);
  const { name, phone, email, interestedService, message, preferredContact, source } =
    parsed.data;

  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    email: email || null,
    interested_service: interestedService || null,
    enquiry_message: [
      preferredContact ? `Preferred contact: ${preferredContact}` : null,
      message || null,
    ]
      .filter(Boolean)
      .join(" — ") || null,
    source,
    status: "new",
  });

  if (error) {
    console.error("Failed to insert lead", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting your enquiry." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
