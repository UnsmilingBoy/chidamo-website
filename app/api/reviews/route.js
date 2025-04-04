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
  const productId = searchParams.get("productId");

  // Build query string dynamically
  let queryParams = new URLSearchParams();
  if (productId) queryParams.append("product", productId);

  try {
    // Construct the WooCommerce API URL with the category filter if provided
    let apiUrl = `${wooCommerceUrl}/wp-json/wc/v3/products/reviews`;
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}`;
    }

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("WooCommerce API Error:", res.status, errorData);
      return NextResponse.json(
        { error: `Failed to fetch reviews: ${res.status}` },
        { status: res.status }
      );
    }

    const reviews = await res.json();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching WooCommerce reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
