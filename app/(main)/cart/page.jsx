"use client";
import CartPricingInfo from "@/components/Cart/CartPricingInfo";
import { useCart } from "@/context/CartContext";
import { completeOrder } from "@/serverActions";
import { toPersianNumber, toPersianPrice } from "@/utils/toPersianNumber";
import { ChevronLeft, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, addToCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + parseInt(item["regular_price"]) * item.quantity,
    0
  );

  const shippingPrice = 80000;

  return (
    <div className="max-w-[1340px] m-auto py-5">
      {cart.length == 0 ? (
        <div className="flex justify-center items-center h-[50vh] w-full">
          <div className="flex flex-col gap-7 font-medium items-center text-xl">
            <Image
              src={"/images/empty-cart.png"}
              alt="Empty cart"
              width={150}
              height={100}
            />
            <p>سبد خرید شما خالی است.</p>
            <Link
              className="flex items-center gap-2 py-2 px-3 text-base text-white font-normal bg-primary rounded-lg"
              href={"/"}
            >
              <p>صفحه اصلی</p>
              <ChevronLeft size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-center gap-2">
            <p className="text-primary font-medium">سبد خرید</p>
            <div className="bg-primary w-24 h-[3px]"></div>
          </div>
          <div className="flex flex-col p-5 items-center md:items-start md:flex-row w-full gap-5 justify-between">
            <div className="flex flex-col w-full">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-row gap-5 ${
                    index == 0 ? "pb-10" : "py-10"
                  } border-b`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-[100px] h-[100px] aspect-square overflow-hidden rounded-md">
                      <Image
                        src={item.images[0].src}
                        width={100}
                        height={100}
                        alt="Product image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-row items-center gap-3 border border-gray-200 p-2 rounded-md">
                      <Plus
                        onClick={() => addToCart(item)}
                        className="cursor-pointer text-primary"
                        size={18}
                      />
                      <p className="text-lg select-none">
                        {toPersianNumber(item.quantity)}
                      </p>
                      {item.quantity == 1 ? (
                        <Trash
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                          className="cursor-pointer"
                          size={18}
                          color="red"
                        />
                      ) : (
                        <Minus
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="cursor-pointer"
                          size={18}
                          color="red"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-gray-500">
                    <p className="text-black font-medium text-lg">
                      {item.name}
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        <div className="w-1 h-1 p-[6px] bg-green-600 rounded-full"></div>
                        <p className="text-sm">سبز</p>
                      </div>
                      <p className="text-sm">7 روز تضمین بازگشت کالا</p>
                      <p className="text-sm">ارسال فروشنده</p>
                    </div>
                    <p className="text-black text-lg font-medium">
                      {toPersianPrice(item.price)} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <CartPricingInfo
              shippingPrice={shippingPrice}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      )}
    </div>
  );
}
