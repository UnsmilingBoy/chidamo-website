import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const wooCommerceUrl = process.env.BASE_URL;

  const { id } = await params;

  try {
    const apiUrl = `${wooCommerceUrl}/wp-json/wp/v2/posts/${id}?_embed`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("WooCommerce API Error:", res.status, errorData);
      return NextResponse.json(
        { error: `Failed to fetch post: ${res.status}` },
        { status: res.status }
      );
    }

    const post = await res.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching the post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
