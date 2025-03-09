import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { pathname } = req.nextUrl;

  // Protect all /profile routes
  if (pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware only to /profile and its subroutes
export const config = {
  matcher: ["/profile/:path*"],
};
