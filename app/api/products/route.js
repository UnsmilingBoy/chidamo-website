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
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const include = searchParams.get("include");
  const stock_status = searchParams.get("stock_status");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");

  // Build query string dynamically
  let queryParams = new URLSearchParams();
  if (category) queryParams.append("category", category);
  if (search) queryParams.append("search", search);
  if (include) queryParams.append("include", include);
  if (stock_status) queryParams.append("stock_status", stock_status);
  if (min_price) queryParams.append("min_price", min_price);
  if (max_price) queryParams.append("max_price", max_price);

  try {
    // Construct the WooCommerce API URL with the category filter if provided
    let apiUrl = `${wooCommerceUrl}/wp-json/wc/v3/products`;
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}&per_page=12`;
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
        { error: `Failed to fetch products: ${res.status}` },
        { status: res.status }
      );
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
