import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { firstName, lastName, phone, email } = await req.json();
  const baseUrl = process.env.BASE_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const { id } = await params;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  try {
    const response = await fetch(baseUrl + `/wp-json/wc/v3/customers/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        billing: {
          phone: phone,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("edit user info complete: " + data);
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
