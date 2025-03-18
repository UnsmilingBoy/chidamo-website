import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategoryProducts from "@/components/Category Page/CategoryProducts";
import ProductTile from "@/components/ProductTile";

async function searchForProduct(query) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/products?search=${query}`);
  const results = await res.json();
  return results;
}

export default async function searchResult({ params }) {
  const { query } = await params;
  const results = await searchForProduct(query);
  return (
    <div className="p-6 max-w-[1340px] m-auto">
      <div className="flex flex-row gap-10">
        <CategoryFilters />
        <CategoryProducts products={results} />
      </div>
    </div>
  );
}
