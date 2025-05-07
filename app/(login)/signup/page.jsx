"use client";

import LoadingSpinner from "@/utils/loadingSpinner";
import { logoPicker } from "@/utils/SeasonChanger";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const signUpUser = async (username, password, email, firstName, lastName) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("email is " + email);
  try {
    const response = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, username, password }),
    });

    const data = await response.json();
    console.log(data);
    return [data, response.status];
  } catch (error) {
    console.error("Login error:", error.message);
    return null;
  }
};

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleError() {
    if (
      email == "" ||
      username == "" ||
      password == "" ||
      firstName == "" ||
      lastName == ""
    ) {
      setError("لطفا همه ی فیلد ها را کامل کنید.");
    } else if (password != repeatPassword) {
      setError("تکرار رمز عبور با رمز عبور همخوانی ندارد.");
    } else if (!email.includes("@") || email.length < 5) {
      setError("ایمیل نامعتبر می باشد.");
    } else if (password.length < 5) {
      setError("از رمز عبور قوی تر استفاده کنید.");
    } else if (username.length < 5) {
      setError("نام کاربری کوتاه می باشد.");
    } else {
      setLoading(true);
      setError("");
      let response = await signUpUser(
        username,
        password,
        email,
        firstName,
        lastName
      );
      switch (response[1]) {
        case 200:
          redirect("/login");

        default:
          setError("کاربری با این ایمیل یا نام کاربری وجود دارد.");
          break;
      }
    }
    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 border-2 border-[#DFDFDF] rounded-md p-10">
        <Image src={logoPicker()} width={140} height={40} alt="Chidamo Logo" />
        <div className="flex flex-col items-start gap-3">
          <p className="">ثبت نام در چیدامو</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
              type="text"
              placeholder="نام"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
              type="text"
              placeholder="نام خانوادگی"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
              type="email"
              placeholder="ایمیل"
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none w-72 p-3 rounded-md bg-[#F4F4F4]"
              type="email"
              placeholder="نام کاربری"
            />
            <input
              className={`outline-none w-72 p-3 rounded-md bg-[#F4F4F4]`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="رمز عبور"
            />
            <input
              className={`outline-none w-72 p-3 rounded-md bg-[#F4F4F4]`}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
              placeholder="تکرار رمز عبور"
            />
          </div>
          {error && (
            <div className="flex gap-1 items-center">
              <Info className="text-red-600" size={20} />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleError}
          className="bg-primary text-white p-3 rounded-md max-w-[250px] w-full"
        >
          {loading ? (
            <LoadingSpinner color="white" size={20} border={2} />
          ) : (
            <p>ثبت نام</p>
          )}
        </button>
        <p className="text-sm text-[#767676]">
          حساب کاربری دارید؟{" "}
          <span className="text-primary font-medium text-sm">
            <Link href={"/login"}>ورود به حساب کاربری</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
