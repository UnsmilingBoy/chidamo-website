"use client";

import { useCart } from "@/context/CartContext";
import { toPersianNumber, toPersianPrice } from "@/utils/toPersianNumber";
import {
  Delete,
  Minus,
  Plus,
  SettingsIcon,
  ShoppingCartIcon,
  TimerIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function PricingOverview({ product, isSticky }) {
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();

  // const inCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  let cartIndex;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == product.id) {
      cartIndex = i;
    }
  }

  return (
    <div
      className={`flex flex-col gap-5 text-sm rounded-lg border shadow-md border-[#D9D9D9] p-5 w-[520px] h-fit text-nowrap ${
        isSticky && "sticky top-36 h-full"
      }`}
    >
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
        {product["stock_quantity"] < 10 ? (
          <div className="flex flex-row gap-2 items-center">
            <TimerIcon />
            <p className="text-xs font-bold text-red-600">
              2 عدد در انبار باقی مانده
            </p>
          </div>
        ) : (
          <div className="w-36"></div>
        )}
        <div className="flex flex-row justify-end items-center gap-2">
          <p className="font-medium text-2xl">
            {toPersianPrice(product.price)}
          </p>
          <p className="text-sm">تومان</p>
        </div>
      </div>

      {cart.length != 0 && cart[cartIndex].quantity > 0 ? (
        <div className="flex flex-row justify-center gap-3 w-full items-center">
          <div className="flex flex-row items-center gap-3 shadow-md p-2 rounded-md">
            <Plus
              onClick={() => addToCart(product)}
              className="cursor-pointer text-primary"
              size={18}
            />
            <p className="text-lg select-none">
              {toPersianNumber(cart[cartIndex].quantity)}
            </p>
            {cart[cartIndex].quantity == 1 ? (
              <Trash
                onClick={() => {
                  removeFromCart(product.id);
                }}
                className="cursor-pointer"
                size={18}
                color="red"
              />
            ) : (
              <Minus
                onClick={() => {
                  updateQuantity(product.id, cart[cartIndex].quantity - 1);
                }}
                className="cursor-pointer"
                size={18}
                color="red"
              />
            )}
          </div>

          <button
            onClick={() => redirect("/cart")}
            className="border w-full border-primary bg-white font-[Shabnam] p-3 rounded-md my-3 text-black"
          >
            مشاهده سبد خرید
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="bg-primary font-[Shabnam] p-3 rounded-md my-3 text-white"
        >
          <div className="flex flex-row-reverse relative w-full">
            <p className="absolute inset-0 flex items-center justify-center">
              افزودن به سبد خرید
            </p>
            <ShoppingCartIcon size={24} />
          </div>
        </button>
      )}
    </div>
  );
}
