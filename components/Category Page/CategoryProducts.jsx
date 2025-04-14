"use client";
import { useEffect, useState } from "react";
import ProductTile from "../ProductTile";
import CategorySortBy from "./CategorySortBy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import LoadingProductTile from "./LoadingProductTile";
import CategoryFilters from "./CategoryFilters";

export default function CategoryProducts({
  products,
  pages,
  currentPage,
  hideSort,
}) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathName = usePathname();

  if (!currentPage) {
    currentPage = 1;
  }

  function handlePageChange(page) {
    if (currentPage != page) {
      setLoading(true);
      params.set("page", page);
      router.push(`${pathName}?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="flex flex-row gap-10">
      <CategoryFilters setLoading={setLoading} />
      <div className="flex w-full flex-col gap-5 items-center">
        {!hideSort && <CategorySortBy setLoading={setLoading} />}
        {!products.length ? (
          <div className="flex justify-center items-center w-full h-[50vh]">
            <p>کالایی یافت نشد.</p>
          </div>
        ) : loading ? (
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
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, index) => (
            <div
              onClick={() => handlePageChange(index + 1)}
              key={index}
              className={`py-2 px-4 rounded-md cursor-pointer ${
                currentPage == index + 1
                  ? "bg-primary text-white font-medium"
                  : "bg-gray-200"
              }`}
            >
              <p>{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
