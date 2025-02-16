import { NextResponse } from "next/server";

export async function GET(request) {
  const wooCommerceUrl = process.env.BASE_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  ); // Basic auth

  const queryParams = new URLSearchParams({
    _fields: "name,id,count",
  }).toString();

  try {
    const res = await fetch(
      `${wooCommerceUrl}/wp-json/wc/v3/products/categories?${queryParams}`,
      {
        // Construct URL
        headers: {
          Authorization: `Basic ${auth}`, // Basic authentication
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json(); // Try to get error details from WooCommerce
      console.error("WooCommerce API Error:", res.status, errorData); // Log the error
      return NextResponse.json(
        { error: `Failed to fetch categories: ${res.status}` },
        { status: res.status }
      ); // Return error response
    }

    const categories = await res.json();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching WooCommerce categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categoires" },
      { status: 500 }
    );
  }
}
