"use client";
import LoadingSpinner from "@/utils/loadingSpinner";
import { Edit, Info, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const editAddress = async (
  id,
  firstName,
  lastName,
  city,
  phone,
  address,
  postcode
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/address/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        city,
        phone,
        address,
        postcode,
      }),
    });

    const data = await response.json();
    console.log(data);
    return [data, response.status];
  } catch (error) {
    console.error("Edit Address error:", error.message);
    return null;
  }
};

export default function EditAddressButton({
  button,
  id,
  address,
  city,
  postcode,
  phone,
  firstName,
  lastName,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [inputFirstName, setFirstName] = useState(firstName);
  const [inputLastName, setLastName] = useState(lastName);
  const [inputCity, setCity] = useState(city);
  const [inputPhone, setPhone] = useState(phone);
  const [inputAddress, setAddress] = useState(address);
  const [inputPostcode, setPostcode] = useState(postcode);

  const inputList = [
    ["نام", inputFirstName, setFirstName],
    ["نام خانوادگی", inputLastName, setLastName],
    ["شهر", inputCity, setCity],
    ["شماره همراه", inputPhone, setPhone],
    ["آدرس", inputAddress, setAddress],
    ["کدپستی", inputPostcode, setPostcode],
  ];

  async function submitForm() {
    if (
      inputFirstName == firstName &&
      inputLastName == lastName &&
      inputCity == city &&
      inputPhone == phone &&
      inputPostcode == postcode &&
      inputAddress == address
    ) {
      setError("تغییری صورت نگرفته است.");
    } else if (
      inputFirstName == "" ||
      inputCity == "" ||
      inputAddress == "" ||
      inputPhone == "" ||
      inputPostcode == ""
    ) {
      setError("لطفا همه ی فیلد ها را کامل کنید.");
    } else if (inputPhone.length != 11 || inputPhone.slice(0, 2) != "09") {
      console.log(inputPhone.slice(0, 2));
      setError("شماره موبایل نامعتبر است. (مثلا: 09123456789)");
    } else if (inputPostcode.length != 10) {
      setError("کدپستی باید 10 رقمی باشد.");
    } else {
      setLoading(true);
      setError("");
      let response = await editAddress(
        id,
        inputFirstName,
        inputLastName,
        inputCity,
        inputPhone,
        inputAddress,
        inputPostcode
      );
      setLoading(false);
      window.location.reload();
      setOverlay(false);
    }
  }

  function closeTheOverlay() {
    setFirstName(firstName);
    setLastName(lastName);
    setCity(city);
    setPhone(phone);
    setAddress(address);
    setPostcode(postcode);
    setError("");

    setOverlay(false);
  }

  return (
    <div>
      <button onClick={() => setOverlay(true)}>{button}</button>
      {overlay && (
        <div className="h-screen w-screen fixed inset-0 flex bg-black/50 z-[9999999] justify-center items-center">
          <div className="flex flex-col gap-5 w-full mx-4 md:w-[600px] bg-white border border-gray-300 rounded-lg py-4 px-6">
            <div className="flex flex-row justify-between">
              <p className="text-black text-lg">ویرایش آدرس</p>
              <button>
                <X onClick={loading ? null : closeTheOverlay} />
              </button>
            </div>
            <div className="grid gap-2 grid-cols-1 text-black">
              {inputList.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-[#7c7c7c]">{item[0]}</p>
                  <input
                    disabled={loading ? true : false}
                    className="border border-[#dedede] rounded-md p-2"
                    type="text"
                    value={item[1]}
                    onChange={(e) => item[2](e.target.value)}
                  />
                </div>
              ))}
              {error && (
                <div className="flex items-center gap-1 my-2">
                  <Info className="text-red-600" size={20} />
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              )}
            </div>
            <div className="flex flex-row-reverse gap-3 text-black">
              <button
                onClick={submitForm}
                className="p-2 bg-primary rounded-md text-white"
              >
                {loading ? (
                  <LoadingSpinner size={20} color="white" />
                ) : (
                  <p>ثبت تغییرات</p>
                )}
              </button>
              <button
                onClick={loading ? null : closeTheOverlay}
                className="py-2 px-5 bg-gray-200 rounded-md"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
