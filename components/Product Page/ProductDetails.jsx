"use client";

import { useState } from "react";
import Details from "./DetailsTab/Details";
import ProdcutIntroduction from "./DetailsTab/ProductIntroduction";
import ProdcutReviews from "./DetailsTab/ProductReviews";

export default function ProductDetails({ product }) {
  const [isSelected, setIsSelected] = useState(0);
  const contents = ["مشخصات", "معرفی", "نظرات کاربران"];
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-row gap-12 border-b border-gray-300">
        {contents.map((content, index) => (
          <div
            onClick={() => setIsSelected(index)}
            key={index}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <p
              className={isSelected == index ? "font-medium" : "text-[#7F7F7F]"}
            >
              {content}
            </p>
            {isSelected == index && (
              <div className="w-full h-1 bg-primary rounded-md"></div>
            )}
          </div>
        ))}
      </div>
      {isSelected == 0 && <Details />}
      {isSelected == 1 && (
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      )}
      {isSelected == 2 && <ProdcutReviews product={product} />}
    </div>
  );
}
