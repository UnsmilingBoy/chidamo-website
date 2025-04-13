import CategoryProducts from "@/components/Category Page/CategoryProducts";
import { searchForProduct } from "@/lib/fetchProducts";

export default async function searchResult({ params, searchParams }) {
  const { query } = await params;
  const { page } = await searchParams;

  const { products, pages } = await searchForProduct({
    query: query,
    params: searchParams,
  });

  return (
    <div className="p-6 max-w-[1340px] m-auto">
      <div className="flex flex-row">
        <CategoryProducts
          products={products}
          pages={pages}
          currentPage={page}
        />
      </div>
    </div>
  );
}
