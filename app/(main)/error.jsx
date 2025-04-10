// app/error.js
"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center gap-6 flex justify-center flex-col items-center py-10">
      <Image
        src={"/images/error.svg"}
        alt="Error image"
        width={300}
        height={300}
      />
      <h2 className="text-base md:text-xl font-bold">مشکلی پیش آمده است.</h2>
      {/* <p className="text-gray-600 my-2">{error.message}</p> */}
      <button
        onClick={() => reset()}
        className="text-sm md:text-base px-3 py-2 bg-primary text-white rounded"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
