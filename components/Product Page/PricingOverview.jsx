"use client";

import { toPersianPrice } from "@/utils/toPersianNumber";
import { SettingsIcon, ShoppingCartIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

export default function PricingOverview({ product }) {
  return (
    <div className="flex flex-col gap-5 text-sm rounded-lg border shadow-md border-[#D9D9D9] p-5 w-fit h-fit text-nowrap">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 p-5 bg-productPageLightPrimaryColor rounded-md">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/images/shop-icon.svg"}
              width={24}
              height={30}
              alt="Shop icon"
            />
            <p className="text-lg">چیدامو</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/Images/box-icon.svg"}
              width={20}
              height={20}
              alt="Box icon"
            />
            <p className="text-sm text-primary font-medium">
              موجود در انبار فروشنده
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 p-5 bg-productPageLightPrimaryColor rounded-md">
          <SettingsIcon />
          <p>ارزیابی عملکرد:</p>
          <p className="text-green-700 font-medium">خیلی خوب</p>
        </div>
        <div className="flex flex-row gap-2 p-5 bg-productPageLightPrimaryColor rounded-md">
          <Image
            src={"/images/certified-icon.svg"}
            width={20}
            height={20}
            alt="Settings icon"
          />
          <p className="">ضمانت اصالت کالا</p>
        </div>
      </div>
      <div
        className={` flex gap-10 ${
          product["stock_quantity"] < 10 ? "justify-between" : "justify-end"
        }  items-center`}
      >
        {product["stock_quantity"] < 10 && (
          <div className="flex flex-row gap-2 items-center">
            <TimerIcon />
            <p className="text-xs font-bold text-red-600">
              2 عدد در انبار باقی مانده
            </p>
          </div>
        )}
        <div className="flex flex-row justify-end items-center gap-2">
          <p className="font-medium text-2xl">
            {toPersianPrice(product.price)}
          </p>
          <p className="text-sm">تومان</p>
        </div>
      </div>
      <button className="bg-primary font-[Shabnam] p-3 rounded-md my-3 text-white">
        <div className="flex flex-row-reverse relative w-full">
          <p className="absolute inset-0 flex items-center justify-center">
            افزودن به سبد خرید
          </p>
          <ShoppingCartIcon size={24} />
        </div>
      </button>
    </div>
  );
}
