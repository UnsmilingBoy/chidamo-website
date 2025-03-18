import { completeOrder } from "@/serverActions";
import { toPersianPrice } from "@/utils/toPersianNumber";

export default function CartPricingInfo({ totalPrice, shippingPrice }) {
  return (
    <div className="flex flex-col gap-3 p-5 w-[330px] md:w-[400px] border border-gray-200 rounded-md h-fit">
      <div className="flex flex-row justify-between">
        <p className="text-sm">قیمت کالا:</p>
        <p>{toPersianPrice(totalPrice)} تومان</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm">هزینه ارسال:</p>
        <p>{toPersianPrice(shippingPrice)} تومان</p>
      </div>
      <div className="flex flex-row justify-between text-primary">
        <p className="text-sm">قیمت کل:</p>
        <p className="font-medium text-lg">
          {toPersianPrice(totalPrice + shippingPrice)} تومان
        </p>
      </div>
      <button
        onClick={completeOrder}
        className="bg-primary font-[Shabnam] p-3 rounded-md my-3 text-white"
      >
        تکمیل سفارش
      </button>
    </div>
  );
}
