"use client";
import { useEffect, useState } from "react";
import ProductTile from "../ProductTile";
import CategorySortBy from "./CategorySortBy";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import LoadingProductTile from "./LoadingProductTile";
import CategoryFilters from "./CategoryFilters";

export default function CategoryProducts({ products }) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="flex flex-row gap-10">
      <CategoryFilters setLoading={setLoading} />
      <div className="flex w-full flex-col gap-5">
        <CategorySortBy setLoading={setLoading} />
        {loading ? (
          <div className="m-auto w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
            {Array.from({ length: 16 }).map((_, index) => (
              <LoadingProductTile key={index} />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
