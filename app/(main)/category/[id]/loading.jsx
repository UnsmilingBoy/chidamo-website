"use client";
import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategorySortBy from "@/components/Category Page/CategorySortBy";
import LoadingProductTile from "@/components/Category Page/LoadingProductTile";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-7 max-w-[1340px] m-auto">
      <div className="w-full px-10 bg-[#EEEEEE] h-8 rounded-sm"></div>
      <div className="flex flex-row justify-center w-full gap-10 ">
        <CategoryFilters />
        <div className="flex flex-col gap-5 flex-1 w-full">
          <CategorySortBy />
          <div className="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
            {Array.from({ length: 16 }).map((_, index) => (
              <LoadingProductTile key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
