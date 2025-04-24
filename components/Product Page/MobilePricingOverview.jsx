"use client";

import { useCart } from "@/context/CartContext";
import LoadingSpinner from "@/utils/loadingSpinner";
import { toPersianPrice } from "@/utils/toPersianNumber";
import { Minus, Plus, ShoppingCartIcon, TimerIcon, Trash } from "lucide-react";
import { redirect } from "next/navigation";

export default function MobilePricingOverview({ product }) {
  const { addToCart, cart, updateQuantity, removeFromCart, isLoading } =
    useCart();
  let cartIndex;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == product.id) {
      cartIndex = i;
    }
  }

  return (
    <div className="flex flex-col px-6 py-2 gap-3 border-t bg-white xl:hidden w-full fixed bottom-0">
      {product["stock_quantity"] != 0 && (
        <div
          className={` flex w-full gap-10 ${
            product["stock_quantity"] < 10 ? "justify-between" : "justify-end"
          }  items-center`}
        >
          {product["stock_quantity"] < 10 ? (
            <div className="flex flex-row gap-2 items-center">
              <TimerIcon />
              <p className="text-xs font-bold text-red-600">
                {product["stock_quantity"]} عدد در انبار باقی مانده
              </p>
            </div>
          ) : (
            <div className="w-36"></div>
          )}
          <div className="flex flex-row justify-end items-center gap-2">
            <p className="font-bold text-2xl">
              {toPersianPrice(product.price)}
            </p>
            <p className="text-sm">تومان</p>
          </div>
        </div>
      )}
      {product["stock_quantity"] == 0 ? (
        <p className="text-center font-bold text-gray-500 p-2">نا موجود</p>
      ) : cart.length != 0 && cart[cartIndex]?.quantity > 0 ? (
        <div className="flex flex-row justify-center gap-3 w-full items-center">
          {isLoading.isProductLoading(product.id) ? (
            // <div className="flex items-center justify-center">
            //   <div className="inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
            // </div>
            <LoadingSpinner size={25} />
          ) : (
            <div className="flex flex-row items-center gap-3 shadow-md p-2 rounded-md">
              <Plus
                onClick={() => addToCart(product)}
                className="cursor-pointer text-primary"
                size={18}
              />
              <p className="text-lg select-none">{cart[cartIndex]?.quantity}</p>
              {cart[cartIndex]?.quantity == 1 ? (
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
                    updateQuantity(product.id, cart[cartIndex]?.quantity - 1);
                  }}
                  className="cursor-pointer"
                  size={18}
                  color="red"
                />
              )}
            </div>
          )}

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
          {isLoading.isProductLoading(product.id) ? (
            <LoadingSpinner color="white" size={25} />
          ) : (
            <div className="flex flex-row-reverse relative w-full">
              <p className="absolute inset-0 flex items-center justify-center">
                افزودن به سبد خرید
              </p>
              <ShoppingCartIcon size={24} />
            </div>
          )}
        </button>
      )}
    </div>
  );
}
