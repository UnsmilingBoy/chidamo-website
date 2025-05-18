import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs"; // Force Node.js runtime

export async function POST(req) {
  try {
    const { phone } = await req.json();
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(baseUrl + "/wp-json/custom/v2/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: phone,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true });
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
