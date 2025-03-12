"use client";

import CartPricingInfo from "@/components/Cart/CartPricingInfo";
import { logoPicker } from "@/utils/SeasonChanger";
import { ArrowRight, MapPinHouse, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Checkout() {
  const [selected, setSelected] = useState(0);
  const inputFields = [
    {
      placeholder: "آدرس",
      span: 4,
    },
    {
      placeholder: "پلاک",
      span: 1,
    },
    {
      placeholder: "واحد",
      span: 1,
    },
    {
      placeholder: "کدپستی",
      span: 2,
    },
  ];

  const provinceList = [
    { value: "apple", label: "مازندران" },
    { value: "banana", label: "تهران" },
    { value: "orange", label: "خوزستان" },
  ];

  const cityList = [
    { value: "apple", label: "آمل" },
    { value: "banana", label: "تهران" },
    { value: "orange", label: "اهواز" },
  ];

  const [selectedProvince, setSelectedProvince] = useState(
    provinceList[0].value
  );
  const [seletedCity, setSelectedCity] = useState(cityList[0].value);
  const handleCitySelection = (e) => {
    setSelectedCity(e.target.value);
  };
  const handleProvinceSelection = (e) => {
    setSelectedProvince(e.target.value);
  };

  return (
    <div className="flex flex-col w-full m-auto max-w-[1250px] py-7 gap-5">
      <div className="relative flex w-full items-center border border-[#DEDEDE] px-5 py-5 rounded-lg justify-between">
        <Link href={"/cart"} className="flex gap-2">
          <ArrowRight />
          <p className="font-medium">آدرس و زمان ارسال</p>
        </Link>
        <Link href={"/"} className="flex items-center justify-center">
          <Image
            src={logoPicker()}
            alt="Chidamo Logo"
            width={110}
            height={40}
          />
        </Link>
        <div className="w-28 h-1"></div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col w-full border border-[#DEDEDE] gap-2 p-5 rounded-lg">
          <div
            onClick={() => setSelected(0)}
            className={`flex border w-full cursor-pointer items-center ${
              selected == 0 ? "border-primary" : "border-[#DEDEDE]"
            } py-3 px-5 gap-4 rounded-lg`}
          >
            <Truck size={20} />
            <div className="flex flex-col gap-2">
              <p className="text-primary">ارسال به آدرس شما</p>
              <p className="text-gray-500">ADDRESS</p>
            </div>
          </div>
          <div
            onClick={() => setSelected(1)}
            className={`flex flex-col border cursor-pointer w-full items-start  ${
              selected == 1 ? "border-primary" : "border-[#DEDEDE]"
            }  py-3 px-5 gap-4 rounded-lg`}
          >
            <div className="flex flex-row gap-4 items-center">
              <MapPinHouse size={20} />
              <p className="text-black">ارسال به آدرس دلخواه</p>
            </div>

            <div className="grid grid-cols-4 gap-5">
              <select
                id="province-select"
                onChange={handleProvinceSelection}
                className="border border-[#e2e2e2] rounded p-3 col-span-2 outline-none"
              >
                {provinceList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                id="city-select"
                onChange={handleCitySelection}
                className="border border-[#e2e2e2] rounded p-3 col-span-2 outline-none"
              >
                {cityList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {inputFields.map((item, index) => (
                <input
                  key={index}
                  className={`col-span-${item.span} border border-[#e2e2e2] p-3 rounded-md outline-none`}
                  type="text"
                  placeholder={item.placeholder}
                />
              ))}
            </div>
          </div>
        </div>
        <CartPricingInfo />
      </div>
    </div>
  );
}
