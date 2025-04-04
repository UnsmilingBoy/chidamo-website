"use client";

import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

const loginUser = async (username, password) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    // console.log(data);

    localStorage.setItem("token", data.token); // Store token
    return [data, response.status];
  } catch (error) {
    console.error("Login error:", error.message);
    return null;
  }
};

export default function LoginButton({ username, password, setError }) {
  const searchParams = useSearchParams();
  const returnPage = searchParams.get("returnPage");
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        if (!username || !password) {
          setError(true);
        } else {
          setLoading(true);
          let response = await loginUser(username, password);
          switch (response[1]) {
            case 200:
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
      {loading ? (
        <Image
          className="h-full"
          src="/images/loading-gif.gif"
          width={24}
          height={40}
          alt="Loading gif"
        />
      ) : (
        "ورود"
      )}
    </button>
  );
}
