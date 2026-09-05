import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

const CRM_PATH_PREFIX = "/crm";

/**
 * Refreshes the Supabase auth session on every request and gates the
 * private CRM routes behind authentication. Public marketing routes are
 * never touched beyond the cheap prefix check below.
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isCrmRoute = request.nextUrl.pathname.startsWith(CRM_PATH_PREFIX);
  const isLoginRoute = request.nextUrl.pathname.startsWith("/crm/login");

  if (isCrmRoute && !isLoginRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/crm/login";
    return NextResponse.redirect(loginUrl);
  }

  return response;
}
