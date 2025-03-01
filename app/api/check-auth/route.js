import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  const response = await fetch(
    `${process.env.BASE_URL}/wp-json/wp/v2/users/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  const user = await response.json();
  return NextResponse.json({ isAuthenticated: true, user });
}
