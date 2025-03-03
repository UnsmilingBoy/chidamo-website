"use client";
import ProductTile from "../ProductTile";
import CategorySortBy from "./CategorySortBy";

export default function CategoryProducts({ products }) {
  return (
    <div className="flex flex-col gap-5">
      <CategorySortBy />
      <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
        {products.map((product, index) => (
          <div key={index} className="w-[250px]">
            <ProductTile
              image={product?.images?.[0]?.src || "/images/atr.jpg"}
              price={product["regular_price"]}
              title={product.name}
              productId={product.id}
              onSalePrice={product["sale_price"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
