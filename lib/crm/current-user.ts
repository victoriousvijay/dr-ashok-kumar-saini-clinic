import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/crm/types";

export async function getCurrentProfile(): Promise<{
  userId: string;
  email: string | null;
  profile: ProfileRow | null;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { userId: user.id, email: user.email ?? null, profile: profile ?? null };
}
