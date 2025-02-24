"use client";

import { toPersianNumber, toPersianPrice } from "@/utils/toPersianNumber";
import { Inventory, ShoppingCart, Store } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";

export default function PricingOverview({ product }) {
  return (
    <div className="flex flex-col gap-2 text-sm rounded-lg border shadow-md border-[#D9D9D9] p-5 w-[500px] h-fit">
      <div className="flex flex-col gap-2 p-5 bg-[#FFF7F5] rounded-md">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={"/images/shop-icon.svg"}
            width={24}
            height={30}
            alt="Shop icon"
          />
          <p className="text-lg">چیدامو</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Image
            src={"/Images/box-icon.svg"}
            width={20}
            height={20}
            alt="Box icon"
          />
          <p className="text-sm">
            موجود در انبار فروشنده (ارسال از 1 روز کاری)
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2 p-5 bg-[#FFF7F5] rounded-md">
        <Image
          src={"/images/settings-icon.svg"}
          width={20}
          height={20}
          alt="Settings icon"
        />
        <p>ارزیابی عملکرد کلی</p>
        <p className="text-green-800">خیلی خوب</p>
      </div>
      <div className="flex flex-row gap-2 p-5 bg-[#FFF7F5] rounded-md">
        <Image
          src={"/images/certified-icon.svg"}
          width={20}
          height={20}
          alt="Settings icon"
        />
        <p>ضمانت اصالت کالا</p>
      </div>
      <div className="flex flex-row justify-end items-center gap-2 mt-5">
        <p className="font-medium text-2xl">{toPersianPrice(product.price)}</p>
        <p className="text-sm">تومان</p>
      </div>
      <Button
        className="bg-[#009B1C] font-[Shabnam] py-3 my-3"
        variant="contained"
      >
        <div className="flex flex-row-reverse relative w-full">
          <p className="absolute inset-0 flex items-center justify-center text-[16px]">
            افزودن به سبد خرید
          </p>
          <ShoppingCart />
        </div>
      </Button>
    </div>
  );
}
