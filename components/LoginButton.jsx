"use client";

import { useCart } from "@/context/CartContext";
import { baseUrl } from "@/lib/baseUrl";
import LoadingSpinner from "@/utils/loadingSpinner";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, spring } from "framer-motion";

const sendOtp = async (phone) => {
  try {
    const baseLocalUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseLocalUrl}/api/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await response.json();
    // console.log(data);

    if (!response.ok) {
      return {
        status: response.status,
      };
    }

    // localStorage.setItem("token", data.token); // Store token
    // const res = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
    //   headers: { Authorization: `Bearer ${data.token}` },
    //   cache: "no-store",
    // });
    // let user = null;
    // if (res.ok) {
    //   user = await res.json();
    // }
    return {
      // data: data,
      status: response.status,
      // id: user.id,
    };
  } catch (error) {
    console.error("Login error:", error.message);
    return {
      status: 402,
    };
  }
};

const verifyOtpRequest = async (phone, otp) => {
  try {
    const baseLocalUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseLocalUrl}/api/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await response.json();
    // console.log(data);

    if (!response.ok) {
      return {
        status: response.status,
      };
    }

    localStorage.setItem("token", data.token); // Store token
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${data.token}` },
      cache: "no-store",
    });
    let user = null;
    if (res.ok) {
      user = await res.json();
    }
    return {
      data: data,
      status: response.status,
      id: user.id,
    };
  } catch (error) {
    console.error("Login error:", error.message);
    return {
      status: 402,
    };
  }
};

export default function LoginButton({
  phone,
  otp,
  setError,
  verifyOtp,
  setVerifyOtp,
}) {
  const searchParams = useSearchParams();
  const returnPage = searchParams.get("returnPage");
  const [loading, setLoading] = useState(false);
  const { migrateCartToApi } = useCart();

  const [cooldown, setCooldown] = useState(0); // 0 = ready, > 0 = countdown active

  // Timer effect
  useEffect(() => {
    if (cooldown === 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  async function sendOtpFunc() {
    if (!phone || phone.length != 11) {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      const { status } = await sendOtp(phone);

      if (status == 200) {
        //     // await migrateCartToApi(null, id);
        //     // window.location.reload();
        //     // redirect(returnPage || "/");
        console.log("otp sent");
        setVerifyOtp(true);
        setCooldown(60);
      } else {
        setError(true);
      }

      setLoading(false);
    }
  }

  async function verifyOtpFunc() {
    console.log("verifying otp");
    if (!otp) {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      let { status, id } = await verifyOtpRequest(phone, otp);

      if (status == 200) {
        setVerifyOtp(false);
        await migrateCartToApi(null, id);
        window.location.reload();
        redirect(returnPage || "/");
      } else {
        setError(true);
      }

      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: spring }}
        onClick={verifyOtp ? verifyOtpFunc : sendOtpFunc}
        className="bg-primary flex justify-center text-white w-full rounded-md py-3"
      >
        {loading ? (
          <LoadingSpinner color="white" size={20} border={2} />
        ) : verifyOtp ? (
          "ورود"
        ) : (
          "ادامه"
        )}
      </motion.button>
      {verifyOtp && (
        <div className="flex flex-row w-full gap-2">
          <button
            onClick={sendOtpFunc}
            disabled={cooldown > 0}
            className={`w-full py-2 rounded-md border border-gray-300 ${
              cooldown > 0 ? "text-gray-400 cursor-not-allowed" : "text-primary"
            }`}
          >
            {cooldown > 0 ? `ارسال مجدد (${cooldown})` : "ارسال مجدد"}
          </button>
          <button
            onClick={() => setVerifyOtp(false)}
            className="border border-gray-300 text-[#646464] flex justify-center w-full rounded-md py-3"
          >
            تغییر شماره همراه
          </button>
        </div>
      )}
    </div>
  );
}
