import BannerSlider from "@/components/BannerSlider";
import MiniBanner from "@/components/MiniBanners";
import ProductsCatalog from "@/components/ProductsCatalog";
import SalesBox from "@/components/SalesBox/SalesBox";
import StoriesSection from "@/components/StoriesSection/StoriesSection";

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + "/api/products");
  const products = await res.json();
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col">
      <BannerSlider />
      <div className="flex flex-col w-full max-w-[1400px] m-auto px-5 lg:px-10">
        <StoriesSection />
        <SalesBox products={products} />
        <MiniBanner />
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
