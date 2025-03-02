import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";
import ExpandCollapseText from "@/components/HomeExpandableText";

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + "/api/categories", {
    cache: "force-cache",
  });
  const categories = await res.json();
  return categories;
}

export default async function RootLayout({ children }) {
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

  const categories = await getCategories();
  return (
    <AuthProvider initialUser={user}>
      <Header categories={categories} />
      <main className="pt-[183px]">{children}</main>
      <ExpandCollapseText />
      <Footer categories={categories} />
    </AuthProvider>
  );
}
