import { fetchWithRetry } from "@/lib/fetchWithRetry";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const wooCommerceUrl = process.env.BASE_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  const { id } = await params;

  try {
    // Construct the WooCommerce API URL
    const apiUrl = `${wooCommerceUrl}/wp-json/wc/v3/products/${id}`;

    const res = await fetchWithRetry(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("WooCommerce API Error:", res.status, errorData);
      return NextResponse.json(
        { error: `Failed to fetch product: ${res.status}` },
        { status: res.status }
      );
    }

    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching WooCommerce product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
