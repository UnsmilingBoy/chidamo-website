"use client";

import { MapPinHouse } from "lucide-react";
import { useState } from "react";

export default function CheckOutInputFields() {
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
    <div
      className={`flex flex-col border-2 cursor-pointer w-full items-start border-primary py-3 px-5 gap-4 rounded-lg`}
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
  );
}
