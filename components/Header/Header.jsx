"use client";
import Image from "next/image";
import CategoryItem from "./CategoryItem";
import { logoPicker } from "@/utils/SeasonChanger";
import { useEffect, useState } from "react";
import Ad from "./Ad";
import Link from "next/link";
import CategoryDropdownItem from "./CategoryDropdownItem";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

export default function Header({ categories }) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  function searchFunction(e) {
    if (e.key === "Enter") {
      router.push(`/search/${inputValue}`);
    }
  }

  const categoryDropdownItems = [];
  const categoryIds = [];
  for (let i = 0; i < categories.length; i++) {
    categoryDropdownItems.push(categories[i].name);
    categoryIds.push(categories[i].id);
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      window.scrollY > 50 ? setIsFixed(true) : setIsFixed(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isFixed ? "fixed" : "absolute"
      } flex flex-col w-full z-50 border-b border-[#dcdcdc]`}
    >
      <Ad />
      <div
        className={`${
          isFixed ? "py-3" : "py-5"
        } bg-white w-full flex flex-col px-16 gap-6`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <Link href="/">
              <Image
                src={logoPicker()}
                alt="Logo with leaf"
                width={135}
                height={100}
              />
            </Link>
            <div className="flex flex-row mx-5 bg-[#F0F0F0] rounded-xl items-center px-5 h-12">
              <SearchIcon className="text-[#9C9D9E]" />
              <input
                onKeyDown={searchFunction}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="محصول، برند یا دسته مورد نظرتان را جستجو کنید."
                className="text-sm bg-[#F0F0F0] outline-none text-black px-2  w-[500px]"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 text-[#313131]">
            <Link href="/cat">
              <button className="flex flex-row items-center gap-4 border border-[#adadad] rounded-xl px-5 py-2 mx-2">
                <p>ورود</p>
                <div className="w-[1.5px] h-5 bg-[#666]"></div>
                <p>ثبت نام</p>
              </button>
            </Link>
            <div className="w-[1px] h-7 bg-[#666]"></div>
            <button>
              <img src="/images/shopping-cart.svg" alt="Shopping cart icon" />
            </button>
          </div>
        </div>
        {!isFixed && (
          <div className={`flex flex-row items-center gap-8`}>
            <div className="relative group">
              <CategoryItem
                title="دسته بندی محصولات"
                image="/images/category.svg"
              />
              <div className="absolute w-[600px] right-0 opacity-0 pointer-events-none pt-6 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-100 delay-150">
                <ul className="grid grid-cols-3 bg-white shadow-md rounded-md overflow-hidden">
                  {categoryDropdownItems.map((item, index) => (
                    <CategoryDropdownItem
                      key={index}
                      title={item}
                      id={categoryIds[index]}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-[1px] h-4 bg-[#b9b9b9]"></div>
            <CategoryItem
              title="محصولات تخفیف دار"
              image="/images/sales-icon.svg"
            />
            <CategoryItem
              title="پرفروش ترین ها"
              image="/images/fire-icon.svg"
            />
            <CategoryItem title="فروشنده شو!" image="/images/seller-icon.svg" />
          </div>
        )}
      </div>
    </header>
  );
}
