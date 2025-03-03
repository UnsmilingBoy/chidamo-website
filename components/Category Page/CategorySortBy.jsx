import { ListFilter } from "lucide-react";
import { useState } from "react";

export default function CategorySortBy() {
  const sortBy = ["جدیدترین", "قدیمی ترین", "بیشترین امتیاز", "کمترین امتیاز"];
  const [isSelected, setIsSelected] = useState(0);
  return (
    <div className="flex flex-row gap-7 text-sm items-center bg-productPageLightPrimaryColor py-3 px-6 rounded-md">
      <div className="flex flex-row gap-1 items-center">
        <ListFilter size={20} />
        <p className="font-medium">ترتیب:</p>
      </div>
      {sortBy.map((item, index) => (
        <p
          onClick={() => setIsSelected(index)}
          key={index}
          className={`cursor-pointer ${
            isSelected == index ? "text-primary font-medium" : "text-[#7A7A7A]"
          }`}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
