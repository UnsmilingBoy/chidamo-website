import { NextResponse } from "next/server";

export async function GET(request) {
  const wooCommerceUrl = process.env.BASE_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  ); // Basic auth

  try {
    const res = await fetch(`${wooCommerceUrl}/wp-json/wc/v3/products`, {
      // Construct URL
      headers: {
        Authorization: `Basic ${auth}`, // Basic authentication
      },
    });

    if (!res.ok) {
      const errorData = await res.json(); // Try to get error details from WooCommerce
      console.error("WooCommerce API Error:", res.status, errorData); // Log the error
      return NextResponse.json(
        { error: `Failed to fetch products: ${res.status}` },
        { status: res.status }
      ); // Return error response
    }

    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
