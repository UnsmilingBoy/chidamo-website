import { NextResponse } from "next/server";

export async function GET(request) {
  const wooCommerceUrl = process.env.BASE_URL;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  let queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);

  try {
    // Construct the WooCommerce API URL
    let apiUrl = `${wooCommerceUrl}/wp-json/wp/v2/posts?_embed&page=${page}`;
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}&per_page=12&_fields=id,name,date_created,date_modified,status,description,short_description,price,regular_price,sale_price,on_sale,total_sales,stock_quantity,average_rating,rating_count,images,attributes,related_ids,stock_status,chidamo-store-id&status=publish`;
    }

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("WooCommerce API Error:", res.status, errorData);
      return NextResponse.json(
        { error: `Failed to fetch posts: ${res.status}` },
        { status: res.status }
      );
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages"), 10);
    const totalProducts = parseInt(res.headers.get("X-WP-Total"), 10);
    const postsList = await res.json();
    return NextResponse.json({ postsList, totalPages, totalProducts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
