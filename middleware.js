import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Disable caching for all responses
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  return res;
}
