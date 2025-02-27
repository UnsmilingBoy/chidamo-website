"use client";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import ProductTile from "../ProductTile";

export default function CategoryProducts({ products }) {
  const sortBy = ["جدیدترین", "قدیمی ترین", "بیشترین امتیاز", "کمترین امتیاز"];
  const [isSelected, setIsSelected] = useState(0);
  return (
    <div className="flex flex-col gap-5">
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
              isSelected == index
                ? "text-primary font-medium"
                : "text-[#7A7A7A]"
            }`}
          >
            {item}
          </p>
        ))}
      </div>
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
