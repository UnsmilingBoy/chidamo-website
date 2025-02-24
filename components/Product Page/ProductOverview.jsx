"use client";

import { Comment, QuestionAnswer, Star } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useState } from "react";
import ProductAttributes from "./ProductAttributes";
import ProductGallery from "./ProductGallery";
import { toPersianNumber } from "@/utils/toPersianNumber";

export default function ProductOverview({ product }) {
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
    <div className="flex flex-row p-8 rounded-lg gap-24 border border-[#D9D9D9] w-full">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="font-bold text-lg">{product.name}</h1>
        <Divider />
        <div className="flex flex-row gap-5 text-sm">
          <div className="flex flex-row gap-1 items-center">
            <Star className="text-[#ECB500] text-lg" />
            <p>{toPersianNumber(product["average_rating"])}</p>
            <p className="text-[#767676] text-xs">{`(امتیاز ${toPersianNumber(
              product["rating_count"]
            )} خریدار)`}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <QuestionAnswer className="text-primary" />
            <p>18 دیدگاه</p>
          </div>
        </div>
        <p className="font-medium">رنگ: {colors[selectedColor][0]}</p>
        <div className="flex flex-row gap-2 text-sm items-center">
          {colors.map((color, index) => (
            <div
              onClick={() => setSelectedColor(index)}
              key={index}
              className={`flex flex-row rounded-2xl p-2 gap-2 border-2 cursor-pointer ${
                index == selectedColor ? "border-primary" : "border-[#dadada]"
              }`}
            >
              <div className={`rounded-full w-5 h-5 bg-[#400000] `}></div>
              <p>{color[0]}</p>
            </div>
          ))}
        </div>
        <Divider />
        <p className="font-medium">ویژگی های اصلی</p>
        <ProductAttributes attributesList={productAttributes} />
      </div>
      <ProductGallery photosArray={[product.images[0].src]} />
    </div>
  );
}
