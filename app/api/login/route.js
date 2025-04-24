import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs"; // Force Node.js runtime

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(baseUrl + "/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // console.log("TOKEN SET: " + data.token);
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
        ...(process.env.NODE_ENV === "production" && {
          domain: ".chidamo.com",
        }), // Set domain only in production
        maxAge: 3600,
      });
      // console.log(
      //   "THE ITEM IN THE COOKIE IS: " + cookieStore.get("token")?.value
      // );

      return NextResponse.json({ success: true, token: data.token });
    }

    return NextResponse.json(
      { error: data.message || "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
