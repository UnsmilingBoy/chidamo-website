import { ListFilter, Settings2Icon, X } from "lucide-react";
import { useState } from "react";
import CategoryFilters from "./CategoryFilters";

export default function CategorySortBy() {
  const sortBy = ["جدیدترین", "قدیمی ترین", "بیشترین امتیاز", "کمترین امتیاز"];
  const [isSelected, setIsSelected] = useState(0);
  const [overlay, setOverlay] = useState(false);
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
        <p>{sortBy[isSelected]}</p>
      </div>

      {sortBy.map((item, index) => (
        <p
          onClick={() => setIsSelected(index)}
          key={index}
          className={`hidden md:block cursor-pointer ${
            isSelected == index ? "text-primary font-medium" : "text-[#7A7A7A]"
          }`}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
