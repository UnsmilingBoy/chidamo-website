"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ExpandCollapseText() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-[1400px] m-auto px-5 lg:px-10 my-7 lg:my-10">
      <div
        className={`transition-all flex flex-col gap-3 ${
          isExpanded ? "h-auto" : "h-16 overflow-hidden"
        }`}
      >
        <h1 className="font-bold text-base lg:text-lg">
          فروشگاه اینترنتی چیدامو
        </h1>
        <p>
          محصولات هنری را از فروشندگان محلی در سراسر کشور خریداری کنید. ما یک
          جامعه قوی متشکل از 100000 مشتری و بیش از 600 فروشنده هستیم که آرزوی
          خوب بودن، انجام کارهای خوب و گسترش خوبی را دارند. ما بازاری دموکراتیک،
          خودپایدار و دوطرفه هستیم که بر پایه اعتماد رشد می کند و بر اساس جامعه
          و محتوای با کیفیت ساخته شده است.
        </p>
        <h2 className="font-bold">خرید انواع کیف</h2>
        <p>
          محصولات هنری را از فروشندگان محلی در سراسر کشور خریداری کنید. ما یک
          جامعه قوی متشکل از 100000 مشتری و بیش از 600 فروشنده هستیم که آرزوی
          خوب بودن، انجام کارهای خوب و گسترش خوبی را دارند. ما بازاری دموکراتیک،
          خودپایدار و دوطرفه هستیم که بر پایه اعتماد رشد می کند و بر اساس جامعه
          و محتوای با کیفیت ساخته شده است.
        </p>
        <h2 className="font-bold">خرید انواع کیف</h2>
        <p>
          محصولات هنری را از فروشندگان محلی در سراسر کشور خریداری کنید. ما یک
          جامعه قوی متشکل از 100000 مشتری و بیش از 600 فروشنده هستیم که آرزوی
          خوب بودن، انجام کارهای خوب و گسترش خوبی را دارند. ما بازاری دموکراتیک،
          خودپایدار و دوطرفه هستیم که بر پایه اعتماد رشد می کند و بر اساس جامعه
          و محتوای با کیفیت ساخته شده است.
        </p>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary font-medium mt-2"
      >
        {isExpanded ? (
          <div className="flex flex-row gap-2">
            <p>نمایش کمتر</p>
            <ChevronUp />
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p>نمایش بیشتر</p>
            <ChevronDown />
          </div>
        )}
      </button>
    </div>
  );
}
