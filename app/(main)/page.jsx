import BannerSlider from "@/components/BannerSlider";
import MiniBanner from "@/components/MiniBanners";
import ProductsCatalog from "@/components/ProductsCatalog";
import SalesBox from "@/components/SalesBox/SalesBox";
import StoriesSection from "@/components/StoriesSection/StoriesSection";
import { searchForProduct } from "@/lib/fetchProducts";

export default async function Home({ searchParams }) {
  const { products } = await searchForProduct({ params: searchParams });

  return (
    <div className="flex flex-col">
      <BannerSlider />
      <div className="flex flex-col w-full max-w-[1400px] m-auto px-3 lg:px-10">
        <StoriesSection />
        <SalesBox products={products} />
        <MiniBanner />
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
