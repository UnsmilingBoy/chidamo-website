"use client";
import LoadingSpinner from "@/utils/loadingSpinner";
import { Info, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const editAddress = async (id, firstName, lastName, email) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/edituserinfo/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    });

    const data = await response.json();
    console.log(data);
    return [data, response.status];
  } catch (error) {
    console.error("Edit User Info error:", error.message);
    return null;
  }
};

export default function EditUserInfoButton({
  button,
  id,
  email,
  phone,
  firstName,
  lastName,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [inputFirstName, setFirstName] = useState(firstName);
  const [inputLastName, setLastName] = useState(lastName);
  const [inputPhone, setPhone] = useState(phone);
  const [inputEmail, setEmail] = useState(email);

  const inputList = [
    ["نام", inputFirstName, setFirstName],
    ["نام خانوادگی", inputLastName, setLastName],
    // ["ایمیل", inputEmail, setEmail],
    // ["شماره همراه", inputPhone, setPhone],
  ];

  async function submitForm() {
    if (
      inputFirstName == firstName &&
      inputLastName == lastName
      // inputEmail == email
    ) {
      setError("تغییری صورت نگرفته است.");
    } else if (inputFirstName == "") {
      setError("لطفا همه ی فیلد ها را کامل کنید.");
    } else {
      setLoading(true);
      setError("");
      let response = await editAddress(id, inputFirstName, inputLastName);
      setLoading(false);
      window.location.reload();
      setOverlay(false);
    }
  }

  function closeTheOverlay() {
    setFirstName(firstName);
    setLastName(lastName);
    setPhone(phone);
    setEmail(email);
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
              <p className="text-black text-lg">ویرایش اطلاعات حساب کاربری</p>
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
