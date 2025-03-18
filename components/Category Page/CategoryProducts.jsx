"use client";
import ProductTile from "../ProductTile";
import CategorySortBy from "./CategorySortBy";

export default function CategoryProducts({ products }) {
  return (
    <div className="flex w-full flex-col gap-5">
      <CategorySortBy />
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <div key={index} className="w-full p-7 lg:w-[250px]">
            <ProductTile
              image={product?.images?.[0]?.src || "/images/atr.jpg"}
              price={product["regular_price"]}
              title={product.name}
              productId={product.id}
              onSalePrice={product["sale_price"]}
              stockStatus={product["stock_status"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
