import Image from "next/image";
import HeadlessSwitch from "../Switch";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CategoryFilters() {
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
      <div className="flex flex-row w-full items-center justify-between p-3">
        <p>فقط کالا های موجود</p>
        <HeadlessSwitch />
      </div>
      <div className="flex flex-row w-full items-center justify-between p-3">
        <p>بر اساس قیمت</p>
        <ChevronDown />
      </div>
      <div className="flex flex-row w-full items-center justify-between p-3">
        <p>رنگ</p>
        <ChevronDown />
      </div>
      <div className="flex flex-row w-full items-center justify-between p-3">
        <p>فروشنده</p>
        <ChevronDown />
      </div>
      <div className="flex flex-row w-full items-center justify-between p-3">
        <p>جنس</p>
        <ChevronDown />
      </div>
    </div>
  );
}
