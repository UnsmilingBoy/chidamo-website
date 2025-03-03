"use client";
import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategorySortBy from "@/components/Category Page/CategorySortBy";
import LoadingProductTile from "@/components/Category Page/LoadingProductTile";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-7 p-6">
      <div className="w-full px-10 bg-[#EEEEEE] h-8 rounded-sm"></div>
      <div className="flex flex-row justify-center gap-10 w-full ">
        <CategoryFilters />
        <div className="flex flex-col gap-5">
          <CategorySortBy />
          <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
            {Array.from({ length: 16 }).map((_, index) => (
              <LoadingProductTile key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
