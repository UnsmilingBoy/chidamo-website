import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      billing,
      shipping,
      line_items,
      shipping_lines,
      payment_method = "basc",
      payment_method_title = "Direct bank transfer",
    } = body;

    // Replace with your real WooCommerce keys and site URL
    const baseUrl = process.env.BASE_URL;
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;

    const response = await fetch(
      `${baseUrl}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method,
          payment_method_title,
          set_paid: true,
          billing,
          shipping,
          line_items,
          shipping_lines,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
