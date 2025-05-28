"use client";

import { logoPicker } from "@/utils/SeasonChanger";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogHeader() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  function searchFunction(e) {
    if (e.key === "Enter") {
      router.push(`/blog/search/${inputValue}`);
    }
  }

  return (
    <header className="w-full items-center px-3 md:px-10 py-3 shadow-md">
      <div className=" flex flex-row justify-between items-center w-full max-w-[1350px] m-auto">
        <div className="flex flex-row gap-2">
          <Link href={"/blog"}>
            <Image src={logoPicker()} alt="Logo" width={135} height={135} />
          </Link>
          <div className="hidden sm:flex flex-row mx-5 bg-[#F0F0F0] rounded-xl items-center px-5 h-12">
            <SearchIcon className="text-[#9C9D9E]" />
            <input
              onKeyDown={searchFunction}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="مطلب مورد نظر خود را جستجو کنید.."
              className="text-sm bg-[#F0F0F0] outline-none text-black px-2 md:w-[300px] lg:w-[500px]"
            />
          </div>
        </div>
        <Link href={"/"}>
          <p className="text-sm md:text-base px-4 border py-2 border-primary rounded-md">
            رفتن به فروشگاه
          </p>
        </Link>
      </div>
    </header>
  );
}
