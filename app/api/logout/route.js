import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Delete the cookie by setting same attributes as login
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
    expires: new Date(0), // Expire immediately
    ...(process.env.NODE_ENV === "production" && { domain: ".chidamo.com" }), // Set domain only in production
  });

  return NextResponse.json({ success: true });
}
