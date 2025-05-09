"use client";

import { useCart } from "@/context/CartContext";
import { completeOrder } from "@/serverActions";
import LoadingSpinner from "@/utils/loadingSpinner";
import { toPersianPrice } from "@/utils/toPersianNumber";

export default function CartPricingInfo({ completeOrderFunc, loading }) {
  const { cart, isLoading } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + parseInt(item["regular_price"]) * item.quantity,
    0
  );

  const shippingPrice = 80000;
  return (
    <div className="flex flex-col gap-3 p-5 w-full md:w-[400px] border border-gray-200 rounded-md h-fit">
      <div className="flex flex-row justify-between">
        <p className="text-sm">قیمت کالا:</p>
        {isLoading.initialLoad ? (
          <LoadingSpinner color={"primary"} size={20} border={3} />
        ) : (
          <p>{toPersianPrice(totalPrice)} تومان</p>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm">هزینه ارسال:</p>
        <p>{toPersianPrice(shippingPrice)} تومان</p>
      </div>
      <div className="flex flex-row justify-between text-primary">
        <p className="text-sm">قیمت کل:</p>
        {isLoading.initialLoad ? (
          <LoadingSpinner color={"primary"} size={20} border={3} />
        ) : (
          <p className="font-medium text-lg">
            {toPersianPrice(totalPrice + shippingPrice)} تومان
          </p>
        )}
      </div>
      {loading ? (
        <LoadingSpinner
          className={"my-3"}
          color={"primary"}
          size={24}
          border={3}
        />
      ) : (
        <button
          onClick={completeOrderFunc ? completeOrderFunc : completeOrder}
          className="bg-primary font-[Shabnam] p-3 rounded-md my-3 text-white"
        >
          تکمیل سفارش
        </button>
      )}
    </div>
  );
}
