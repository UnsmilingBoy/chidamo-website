import { fetchWithRetry } from "@/lib/fetchWithRetry";
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
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const include = searchParams.get("include");
  const stock_status = searchParams.get("stock_status");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const order = searchParams.get("order");
  const on_sale = searchParams.get("on_sale");
  const orderBy = searchParams.get("orderby");

  // Build query string dynamically
  let queryParams = new URLSearchParams();
  if (category) queryParams.append("category", category);
  if (search) queryParams.append("search", search);
  if (include) queryParams.append("include", include);
  if (stock_status) queryParams.append("stock_status", stock_status);
  if (min_price) queryParams.append("min_price", min_price);
  if (max_price) queryParams.append("max_price", max_price);
  if (order) queryParams.append("order", order);
  if (orderBy) queryParams.append("orderby", orderBy);
  if (page) queryParams.append("page", page);
  if (per_page) queryParams.append("per_page", per_page);
  if (on_sale) queryParams.append("on_sale", on_sale);

  try {
    // Construct the WooCommerce API URL with the category filter if provided
    let apiUrl = `${wooCommerceUrl}/wp-json/wc/v3/products`;
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}&per_page=12&_fields=id,name,date_created,date_modified,status,description,short_description,price,regular_price,sale_price,on_sale,total_sales,stock_quantity,average_rating,rating_count,images,attributes,related_ids,stock_status,chidamo-store-id`;
    }

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
        { error: `Failed to fetch products: ${res.status}` },
        { status: res.status }
      );
    }

    const products = await res.json();
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages"), 10);
    const totalProducts = parseInt(res.headers.get("X-WP-Total"), 10);
    return NextResponse.json({
      products,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
