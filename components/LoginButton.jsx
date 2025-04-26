"use client";

import { useCart } from "@/context/CartContext";
import { baseUrl } from "@/lib/baseUrl";
import LoadingSpinner from "@/utils/loadingSpinner";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

const loginUser = async (username, password) => {
  try {
    const baseLocalUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseLocalUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    // console.log(data);

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
    return null;
  }
};

export default function LoginButton({ username, password, setError }) {
  const searchParams = useSearchParams();
  const returnPage = searchParams.get("returnPage");
  const [loading, setLoading] = useState(false);
  const { migrateCartToApi } = useCart();

  return (
    <button
      onClick={async () => {
        if (!username || !password) {
          setError(true);
        } else {
          setLoading(true);
          let { status, id } = await loginUser(username, password);
          switch (status) {
            case 200:
              console.log(id);
              await migrateCartToApi(null, id);
              window.location.reload();
              redirect(returnPage || "/");

            default:
              setError(true);
              break;
          }
          setLoading(false);
        }
      }}
      className="bg-primary flex justify-center text-white w-full rounded-md py-3"
    >
      {loading ? <LoadingSpinner color="white" size={20} border={2} /> : "ورود"}
    </button>
  );
}
