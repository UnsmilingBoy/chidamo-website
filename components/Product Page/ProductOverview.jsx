"use client";

import { useState } from "react";
import ProductAttributes from "./ProductAttributes";
import ProductGallery from "./ProductGallery";
import { toPersianNumber } from "@/utils/toPersianNumber";
import { MessageSquare, StarIcon } from "lucide-react";
import colorDict from "@/utils/colorsDict";

export default function ProductOverview({ reviews, product }) {
  const colors = [
    ["قهوه ای تیره", "#400000"],
    ["کرمی", "#FFC6A2"],
    ["مشکی", "#181818"],
  ];

  const productAttributes = [
    ["جنس", "چرم طبیعی بز"],
    ["بند و دستگیره", "بند دوشی، تک بند"],
    ["نحوه بسته شدن", "زیپ"],
    ["جنس قفل", "فلز آبکاری"],
  ];

  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row p-8 rounded-lg gap-24 border border-[#D9D9D9] w-full">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="font-bold text-lg">{product.name}</h1>
        <div className="h-[1px] w-full bg-[#D9D9D9]"></div>
        <div className="flex flex-row gap-5 text-sm">
          <div className="flex flex-row gap-1 items-center">
            <StarIcon className="text-[#ECB500]" size={20} />
            <p>{toPersianNumber(product["average_rating"])}</p>
            <p className="text-[#767676] text-xs">{`(امتیاز ${toPersianNumber(
              product["rating_count"]
            )} خریدار)`}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <MessageSquare className="text-primary" size={20} />
            <p>{reviews.length} دیدگاه</p>
          </div>
        </div>
        <p className="font-medium">
          رنگ:{" "}
          {product["attributes"].length != 0
            ? colorDict[product["attributes"][0].options[selectedColor]]
            : "بدون رنگ"}
        </p>
        <div className="flex flex-row gap-2 text-sm items-center">
          {product["attributes"].length != 0 &&
            product["attributes"][0].options.map((color, index) => (
              <div
                onClick={() => setSelectedColor(index)}
                key={index}
                className={`flex flex-row rounded-2xl p-2 gap-2 border-2 cursor-pointer ${
                  index == selectedColor ? "border-primary" : "border-[#dadada]"
                }`}
              >
                <div
                  style={{ backgroundColor: color }}
                  className={`rounded-full w-5 h-5`}
                ></div>
                <p>{colorDict[color]}</p>
              </div>
            ))}
        </div>
        <div className="h-[1px] w-full bg-[#D9D9D9]"></div>
        <p className="font-medium">ویژگی های اصلی</p>
        <ProductAttributes attributesList={productAttributes} />
      </div>
      <ProductGallery photosArray={[product?.images[0]?.src]} />
    </div>
  );
}
