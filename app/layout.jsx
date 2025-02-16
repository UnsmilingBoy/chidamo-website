import Header from "@/components/Header/Header";
import "../styles/globals.css";
import Footer from "@/components/Footer/Footer";
import ExpandCollapseText from "@/components/HomeExpandableText";

const metadata = {
  title: "Chidamo",
  description: "Chidamo website",
};

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + "/api/categories", {
    cache: "force-cache",
  });
  const categories = await res.json();
  return categories;
}

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header categories={categories} />
        <div className="pt-[183px]">{children}</div>
        <ExpandCollapseText />
        <Footer />
      </body>
    </html>
  );
}
