import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const baseUrl = process.env.BASE_URL;
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;

    const orderData = {
      payment_method: "bacs", // NOTE: this should be "bacs" not "basc"
      payment_method_title: "Direct Bank Transfer",
      set_paid: body.set_paid,
      customer_id: body.customer_id,
      status: body.status,
      billing: body.billing,
      shipping: body.shipping,
      line_items: body.line_items,
    };

    const response = await fetch(
      `${baseUrl}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WooCommerce API Error:", {
        status: response.status,
        statusText: response.statusText,
        response: data,
      });
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Order submission failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
