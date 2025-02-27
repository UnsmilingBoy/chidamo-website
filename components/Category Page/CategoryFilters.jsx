"use client";

import Image from "next/image";
import HeadlessSwitch from "../Switch";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CategoryFilters() {
  const [expandPriceFilter, setExpandPriceFilter] = useState(false);
  const [expandColorFilter, setExpandColorFilter] = useState(false);
  const [expandSellerFilter, setExpandSellerFilter] = useState(false);

  const colors = {
    red: "قرمز",
    blue: "آبی",
    brown: "قهوه ای",
  };

  const sellers = ["چیدامو", "خلیل شاپ"];

  return (
    <div className="flex flex-col items-start w-[300px] border border-[#BBB] rounded-md h-fit">
      <div className="flex flex-row p-4 w-full gap-2 items-center border-b border-[#BBB] font-medium text-[#4A4A4A]">
        <Image
          src="/images/filter-icon.svg"
          width={20}
          height={20}
          alt="Filter icon"
        />
        <p>فیلتر ها</p>
      </div>
      <div className="flex flex-row w-full items-center justify-between p-3 cursor-pointer">
        <p>فقط کالا های موجود</p>
        <HeadlessSwitch />
      </div>
      <div
        onClick={() => setExpandPriceFilter(!expandPriceFilter)}
        className="flex flex-row w-full items-center justify-between p-3 cursor-pointer"
      >
        <p>بر اساس قیمت</p>
        {expandPriceFilter ? <ChevronUp /> : <ChevronDown />}
      </div>
      {expandPriceFilter && (
        <div className="flex flex-col gap-3 w-full items-center py-4">
          <div className="flex flex-col">
            <p className="text-sm text-[#575757]">از قیمت:</p>
            <input
              type="text"
              className="bg-[#F0F0F0] outline-none rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[#575757]">تا قیمت:</p>
            <input
              className="bg-[#F0F0F0] outline-none rounded-md p-2"
              type="text"
            />
          </div>
        </div>
      )}
      <div
        onClick={() => setExpandColorFilter(!expandColorFilter)}
        className="flex flex-row w-full items-center justify-between p-3 cursor-pointer"
      >
        <p>رنگ</p>
        {expandColorFilter ? <ChevronUp /> : <ChevronDown />}
      </div>
      {expandColorFilter && (
        <div className="flex flex-col gap-3 w-full items-start text-sm px-6 py-4">
          {Object.keys(colors).map((color, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <input type="checkbox" />
              <div
                style={{ backgroundColor: color }}
                className="p-2 w-2 h-2 rounded-full"
              ></div>
              <p className="text-[#4A4A4A]">{colors[color]}</p>
            </div>
          ))}
        </div>
      )}
      <div
        onClick={() => setExpandSellerFilter(!expandSellerFilter)}
        className="flex flex-row w-full items-center justify-between p-3 cursor-pointer"
      >
        <p>فروشنده</p>
        {expandSellerFilter ? <ChevronUp /> : <ChevronDown />}
      </div>
      {expandSellerFilter && (
        <div className="flex flex-col gap-3 w-full items-start px-6 py-2">
          {sellers.map((seller, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <input type="checkbox" />
              <p className="text-[#4A4A4A] text-sm">{seller}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row w-full items-center justify-between p-3 cursor-pointer">
        <p>جنس</p>
        <ChevronDown />
      </div>
    </div>
  );
}
