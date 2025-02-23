"use client";
import LoginButton from "@/components/LoginButton";
import { logoPicker } from "@/utils/SeasonChanger";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 border-2 border-[#DFDFDF] rounded-md p-10">
        <Image src={logoPicker()} width={140} height={40} alt="Chidamo Logo" />
        <div className="flex flex-col items-start gap-3">
          <p className="">ورود به حساب کاربری</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
            type="text"
            placeholder="نام کاربری یا آدرس ایمیل"
          />
          <input
            className={`${
              error && "border border-red-600"
            } outline-none w-72 p-3 rounded-md bg-[#F4F4F4]`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="رمز عبور"
          />
          <div className="flex flex-row gap-2">
            <input className="bg-[#F4F4F4]" type="checkbox" />
            <p className="text-sm text-[#717171]">مرا به خاطر بسپار</p>
          </div>
          {error && (
            <p className="text-sm text-red-600">
              نام کاربری یا رمز عبور اشتباه می باشد.
            </p>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <LoginButton
            username={username}
            password={password}
            setError={setError}
          />
          <div className="flex flex-row items-center gap-2">
            <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
            <p className="text-sm text-[#6E6E6E]">یا</p>
            <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
          </div>

          <button className="bg-white text-black w-full border border-[#E6E8E7] rounded-md py-3">
            <div className="flex flex-row items-center justify-center gap-1">
              <Image
                src="/images/google-logo.svg"
                width={23}
                height={20}
                alt="Google Logo"
              />
              <p>ورود با گوگل</p>
            </div>
          </button>
        </div>
        <p className="text-sm text-[#767676]">
          حساب کاربری ندارید؟{" "}
          <span className="text-primary font-medium text-sm">
            ساخت حساب کاربری چیدامو
          </span>
        </p>
      </div>
    </div>
  );
}
