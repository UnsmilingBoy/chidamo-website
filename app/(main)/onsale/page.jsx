import CategoryProducts from "@/components/Category Page/CategoryProducts";
import { searchForProduct } from "@/lib/fetchProducts";

export default async function onSale({ params, searchParams }) {
  const { page } = await searchParams;
  const sParams = await searchParams;

  const { products, pages } = await searchForProduct({
    params: {
      ...sParams,
      on_sale: true,
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
            products={products}
            pages={pages}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
}
