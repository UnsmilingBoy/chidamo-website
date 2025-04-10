import { ListFilter, Settings2Icon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import CategoryFilters from "./CategoryFilters";

export default function CategorySortBy({ setLoading }) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [overlay, setOverlay] = useState(false);

  const sortBy = [
    ["جدیدترین", "desc", "date"],
    ["قدیمی ترین", "asc", "date"],
    ["بیشترین امتیاز", "desc", "rating"],
    ["محبوب ترین", "desc", "popularity"],
  ];
  const [isSelected, setIsSelected] = useState(0);

  function handleSort(index, sort, sortBy) {
    if (index != isSelected) {
      setLoading(true);
      setIsSelected(index);
      params.set("order", sort);
      params.set("orderBy", sortBy);

      router.push(`${pathName}?${params.toString()}`);
    }
  }

  return (
    <div className="flex flex-row w-full gap-7 text-sm items-center bg-productPageLightPrimaryColor py-3 px-6 rounded-md">
      <div
        onClick={() => setOverlay(true)}
        className="flex flex-row gap-1 items-center md:hidden"
      >
        <Settings2Icon size={20} />
        <p>فیلتر</p>
      </div>
      {overlay && (
        <div className="h-screen w-screen fixed inset-0 bg-black/50 z-[99999] flex justify-center items-center">
          <div className="flex flex-col p-5 bg-white rounded-md w-full m-7 gap-5">
            <div className="flex justify-between">
              <p className="font-bold text-lg">فیلتر محصولات</p>
              <X onClick={() => setOverlay(false)} />
            </div>
            <CategoryFilters overlayVersion={true} setOverlay={setOverlay} />
          </div>
        </div>
      )}
      <div className="flex flex-row gap-1 items-center">
        <ListFilter size={20} />
        <p className="font-medium">ترتیب:</p>
        <p>{sortBy[isSelected][0]}</p>
      </div>

      {sortBy.map((item, index) => (
        <p
          onClick={() => handleSort(index, item[1], item[2])}
          key={index}
          className={`hidden md:block cursor-pointer ${
            isSelected == index ? "text-primary font-medium" : "text-[#7A7A7A]"
          }`}
        >
          {item[0]}
        </p>
      ))}
    </div>
  );
}
