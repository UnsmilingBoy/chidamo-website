import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { cookies } from "next/headers";

export default async function SpecificLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;

  if (token) {
    const res = await fetch(`${process.env.BASE_URL}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      user = await res.json();
    }
  }
  return (
    <div className="specific-layout">
      <CartProvider useApi={!!user} userId={user?.id}>
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </CartProvider>
    </div>
  );
}
