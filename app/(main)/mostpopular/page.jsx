import CategoryProducts from "@/components/Category Page/CategoryProducts";
import { searchForProduct } from "@/lib/fetchProducts";

export default async function mostPopular({ params, searchParams }) {
  const { page } = await searchParams;
  const sParams = await searchParams;

  const { products, pages } = await searchForProduct({
    params: {
      ...sParams,
      orderBy: "popularity",
      order: "desc",
    },
  });

  return (
    <div className="p-6 max-w-[1340px] m-auto">
      {!products.length ? (
        <div className="h-[50vh] flex justify-center items-center">
          <p>محصول تخفیف داری پیدا نشد.</p>
        </div>
      ) : (
        <div className="flex flex-row">
          <CategoryProducts
            hideSort={true}
            products={products}
            pages={pages}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
}
