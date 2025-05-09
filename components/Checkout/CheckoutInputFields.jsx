"use client";

import { MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";

export default function CheckOutInputFields({
  selected,
  setSelected,
  form,
  handleChange,
}) {
  useEffect(() => {
    fetch("/iran_cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);
  const inputFields = [
    {
      placeholder: "نام",
      span: 2,
      value: form.firstName,
      name: "firstName",
    },
    {
      placeholder: "نام خانوادگی",
      span: 2,
      value: form.lastName,
      name: "lastName",
    },
    {
      placeholder: "آدرس",
      span: 2,
      value: form.address,
      name: "address",
    },
    {
      placeholder: "پلاک",
      span: 1,
      value: form.pelak,
      name: "pelak",
    },
    {
      placeholder: "واحد",
      span: 1,
      value: form.vahed,
      name: "vahed",
    },
    {
      placeholder: "کدپستی",
      span: 2,
      value: form.postcode,
      name: "postcode",
    },

    {
      placeholder: "شماره همراه",
      span: 2,
      value: form.phone,
      name: "phone",
    },
  ];

  const provinceList = [
    // { value: "select", label: "انتخاب استان..." },
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

  const filteredCities = cities.filter((city) => city.province === form.state);

  return (
    <div
      onClick={() => setSelected(1)}
      className={`flex flex-col border-2 cursor-pointer w-full items-start ${
        selected == 1 ? "border-primary" : "border-[DEDEDE]"
      } py-3 px-5 gap-4 rounded-lg`}
    >
      <div className="flex flex-row gap-4 items-center">
        <MapPinHouse size={20} />
        <p className="text-black">ارسال به آدرس دلخواه</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
        <select
          id="province-select"
          name="state"
          value={form.state}
          onChange={handleChange}
          className="border border-[#e2e2e2] rounded p-3 outline-none w-full"
        >
          <option value="" disabled>
            انتخاب استان...
          </option>
          {provinceList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          id="city-select"
          name="city"
          value={form.city}
          onChange={handleChange}
          className="border border-[#e2e2e2] rounded p-3 w-full outline-none"
        >
          <option value="" disabled>
            انتخاب شهر...
          </option>
          {filteredCities.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
        {inputFields.map((item, index) => (
          <input
            key={index}
            value={item.value}
            name={item.name}
            onChange={handleChange}
            className={`col-span-1 sm:col-span-2 border border-[#e2e2e2] p-3 rounded-md outline-none`}
            type="text"
            placeholder={item.placeholder}
          />
        ))}
      </div>
    </div>
  );
}
