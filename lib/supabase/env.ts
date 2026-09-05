export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Supabase is optional at build time so the site can be scaffolded and
 * deployed before real project credentials exist. Callers should check this
 * before touching the client and degrade gracefully (e.g. the enquiry API
 * route returns a clear error instead of crashing).
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
