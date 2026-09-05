#!/usr/bin/env node
/**
 * One-time setup script: creates the clinic's first CRM admin account.
 *
 * Run locally (not in this sandbox — it needs real network access to
 * Supabase) after setting NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY in the environment:
 *
 *   node scripts/bootstrap-admin.mjs "admin@clinic.example" "Temp-Pass-123!" "Dr. Ashok Kumar Saini"
 *
 * After the first admin exists, invite every other staff member from
 * /crm/staff instead of running this script again.
 */
import { createClient } from "@supabase/supabase-js";

const [, , email, password, fullName] = process.argv;

if (!email || !password || !fullName) {
  console.error(
    'Usage: node scripts/bootstrap-admin.mjs "<email>" "<password>" "<full name>"'
  );
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Failed to create auth user:", error.message);
  process.exit(1);
}

const { error: profileError } = await supabase.from("profiles").insert({
  id: data.user.id,
  full_name: fullName,
  role: "admin",
});

if (profileError) {
  console.error("Auth user created, but the profile insert failed:", profileError.message);
  process.exit(1);
}

console.log(`Admin account created for ${email}. Sign in at /crm/login.`);
