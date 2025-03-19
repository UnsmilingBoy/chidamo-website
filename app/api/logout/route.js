import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Delete the cookie by setting same attributes as login
  cookies().set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
    domain: ".chidamo.com",
    expires: new Date(0), // Expire immediately
  });

  return NextResponse.json({ success: true });
}
