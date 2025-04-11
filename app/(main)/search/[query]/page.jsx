import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategoryProducts from "@/components/Category Page/CategoryProducts";
import ProductTile from "@/components/ProductTile";

async function searchForProduct(query, params) {
  const { available, min_price, max_price, order, orderBy } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    baseUrl +
      `/api/products?search=${query}` +
      `${order ? `&order=${order}` : ""}` +
      `${orderBy ? `&orderBy=${orderBy}` : ""}` +
      `${available ? `&stock_status=${available}` : ""}` +
      `${min_price ? `&min_price=${min_price}` : ""}` +
      `${max_price ? `&max_price=${max_price}` : ""}`
  );
  const results = await res.json();
  return results;
}

export default async function searchResult({ params, searchParams }) {
  const { query } = await params;

  const results = await searchForProduct(query, searchParams);

  return (
    <div className="p-6 max-w-[1340px] m-auto">
      <div className="flex flex-row">
        <CategoryProducts products={results} />
      </div>
    </div>
  );
}
