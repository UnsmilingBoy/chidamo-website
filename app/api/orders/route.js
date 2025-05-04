import { NextResponse } from "next/server";

export async function GET(request) {
  const wooCommerceUrl = process.env.BASE_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  // Extract category from request URL
  const { searchParams } = new URL(request.url);
  const customer = searchParams.get("customer");

  // Build query string dynamically
  let queryParams = new URLSearchParams();
  if (customer) queryParams.append("customer", customer);

  try {
    // Construct the WooCommerce API URL
    let apiUrl = `${wooCommerceUrl}/wp-json/wc/v3/orders`;
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}`;
    }

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("WooCommerce API Error:", res.status, errorData);
      return NextResponse.json(
        { error: `Failed to fetch orders: ${res.status}` },
        { status: res.status }
      );
    }

    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching WooCommerce orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
