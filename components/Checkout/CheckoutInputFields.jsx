"use client";

import { MapPinHouse } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckOutInputFields({ isSelected }) {
  useEffect(() => {
    fetch("/iran_cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);
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
    { value: "Tehran", label: "تهران" },
    { value: "Alborz", label: "البرز" },
    { value: "Isfahan", label: "اصفهان" },
    { value: "Fars", label: "فارس" },
    { value: "Khorasan Razavi", label: "خراسان رضوی" },
    { value: "Khuzestan", label: "خوزستان" },
    { value: "Mazandaran", label: "مازندران" },
    { value: "Gilan", label: "گیلان" },
    { value: "East Azerbaijan", label: "آذربایجان شرقی" },
    { value: "West Azerbaijan", label: "آذربایجان غربی" },
    { value: "Kerman", label: "کرمان" },
    { value: "Qom", label: "قم" },
    { value: "Markazi", label: "مرکزی" },
    { value: "Hamedan", label: "همدان" },
    { value: "Chaharmahal and Bakhtiari", label: "چهارمحال و بختیاری" },
    { value: "Lorestan", label: "لرستان" },
    { value: "Hormozgan", label: "هرمزگان" },
    { value: "Sistan and Baluchestan", label: "سیستان و بلوچستان" },
    { value: "Golestan", label: "گلستان" },
    { value: "Kurdistan", label: "کردستان" },
    { value: "Qazvin", label: "قزوین" },
    { value: "Bushehr", label: "بوشهر" },
    { value: "Zanjan", label: "زنجان" },
    { value: "Semnan", label: "سمنان" },
    { value: "South Khorasan", label: "خراسان جنوبی" },
    { value: "North Khorasan", label: "خراسان شمالی" },
    { value: "Ilam", label: "ایلام" },
    { value: "Kohgiluyeh and Boyer-Ahmad", label: "کهگیلویه و بویراحمد" },
    { value: "Ardabil", label: "اردبیل" },
    { value: "Yazd", label: "یزد" },
  ];

  const [cities, setCities] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(
    provinceList[0].value
  );
  const [seletedCity, setSelectedCity] = useState(cities[0]);
  const handleCitySelection = (e) => {
    setSelectedCity(e.target.value);
  };
  const handleProvinceSelection = (e) => {
    setSelectedProvince(e.target.value);
  };

  return (
    <div
      onClick={() => redirect("/checkout?address=custom")}
      className={`flex flex-col border-2 cursor-pointer w-full items-start ${
        isSelected == "custom" ? "border-primary" : "border-[DEDEDE]"
      } py-3 px-5 gap-4 rounded-lg`}
    >
      <div className="flex flex-row gap-4 items-center">
        <MapPinHouse size={20} />
        <p className="text-black">ارسال به آدرس دلخواه</p>
      </div>
      <div className="w-full grid grid-cols-4 gap-5">
        <select
          id="province-select"
          onChange={handleProvinceSelection}
          className="border border-[#e2e2e2] rounded p-3 col-span-2 outline-none w-full"
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
          className="border border-[#e2e2e2] rounded p-3 col-span-2 w-full outline-none"
        >
          {cities.map((option, index) => (
            <option key={index} value={option.value}>
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
