"use client";

import LoginButton from "@/components/LoginButton";
import { logoPicker } from "@/utils/SeasonChanger";
import Image from "next/image";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", stiffness: 300, damping: 20 }}
        className="max-w-sm flex flex-col items-center gap-14 border-2 border-gray-200 rounded-md p-10 w-full"
      >
        <Image src={logoPicker()} width={140} height={40} alt="Chidamo Logo" />
        <div className="flex flex-col items-start gap-3">
          <p className="">
            {verifyOtp ? "کد ارسال شده را وارد کنید." : "ورود به حساب کاربری"}
          </p>

          {verifyOtp ? (
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
              type="text"
              placeholder="کد ارسالی"
            />
          ) : (
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
              type="text"
              placeholder="شماره همراه"
            />
          )}

          {error && (
            <p className="text-sm text-red-600 line-clamp-3">
              مشکلی پیش آمده است.
            </p>
          )}
          <div className="flex flex-col w-full gap-2 my-3">
            <Suspense fallback={<div>Loading...</div>}>
              <LoginButton
                phone={phone}
                otp={otp}
                setError={setError}
                verifyOtp={verifyOtp}
                setVerifyOtp={setVerifyOtp}
              />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
