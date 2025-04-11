"use client";
import Image from "next/image";
import CategoryItem from "./CategoryItem";
import { chLogoPicker, logoPicker } from "@/utils/SeasonChanger";
import { useEffect, useRef, useState } from "react";
import Ad from "./Ad";
import Link from "next/link";
import CategoryDropdownItem from "./CategoryDropdownItem";
import { usePathname, useRouter } from "next/navigation";
import {
  LogIn,
  LogInIcon,
  Menu,
  SearchIcon,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import UserDropDown from "../UserDropDown";
import { useAuth } from "@/context/AuthContext";
import CartDropDown from "./CartDropDown";
import { useMediaQuery } from "react-responsive";

export default function Header({ categories }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [expandSidebarCategory, setExpandSidebarCategory] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!pathname.includes("search")) {
      setInputValue("");
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setExpandSidebarCategory(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (loading) return null;

  return (
    <>
      <header
        className={`${
          isFixed ? "fixed" : "absolute"
        } flex flex-col w-full z-40 border-b border-[#dcdcdc]`}
      >
        <Ad />
        <div className="py-3 flex flex-col gap-3 px-6 md:px-10 bg-white md:hidden">
          <div className="w-full flex justify-between items-center">
            <Menu onClick={() => setIsOpen(true)} color="#666666" size={24} />
            <Link href="/">
              <Image
                src={logoPicker()}
                alt="Logo with leaf"
                width={110}
                height={100}
              />
            </Link>
            {user ? (
              <Link href={"/profile"}>
                <User color="#666666" size={24} />
              </Link>
            ) : (
              <Link href={`/login?returnPage=${pathname}`}>
                <LogIn color="#666666" size={24} />
              </Link>
            )}
          </div>
          {true && (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div
                ref={sidebarRef}
                className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-5 transform transition-transform duration-300 ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {/* Close Button */}
                <div className="flex justify-between">
                  <button
                    className="mb-4 p-2 rounded-md hover:bg-gray-200 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <Image
                    src={chLogoPicker()}
                    width={40}
                    height={40}
                    alt="Chidamo Logo"
                  />
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col gap-4 mt-5">
                  <CategoryItem
                    onClick={() =>
                      setExpandSidebarCategory(!expandSidebarCategory)
                    }
                    title="دسته بندی محصولات"
                    image="/images/category.svg"
                  />
                  {expandSidebarCategory && (
                    <div className="flex flex-col gap-2">
                      {categoryDropdownItems.map((item, index) => (
                        <Link
                          key={index}
                          href={`/category/${categoryIds[index]}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <p>{item}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="w-full h-[1px] bg-[#BEBEBE]"></div>
                  <CategoryItem
                    title="محصولات تخفیف دار"
                    image="/images/sales-icon.svg"
                  />
                  <div className="w-full h-[1px] bg-[#BEBEBE]"></div>
                  <CategoryItem
                    title="پرفروش ترین ها"
                    image="/images/fire-icon.svg"
                  />
                  <div className="w-full h-[1px] bg-[#BEBEBE]"></div>
                  <CategoryItem
                    title="فروشنده شو!"
                    image="/images/seller-icon.svg"
                  />
                </nav>
              </div>
            </div>
          )}

          <div className="flex items-center gap-5">
            <div className="flex flex-row w-full bg-[#F0F0F0] rounded-xl items-center px-3 h-10">
              <SearchIcon className="text-[#9C9D9E]" />
              <input
                onKeyDown={searchFunction}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="جستجو..."
                className="text-sm bg-[#F0F0F0] outline-none text-black px-2 md:w-[300px] lg:w-[500px]"
              />
            </div>
            <Link href={"/cart"}>
              <ShoppingCart color="#666666" size={24} />
            </Link>
          </div>
        </div>
        <div
          className={`${
            isFixed ? "py-3" : "py-5"
          } bg-white hidden w-full md:flex flex-col px-10 md:px-16 gap-6`}
        >
          <div className="flex flex-row justify-between w-full m-auto xl:max-w-[1600px]">
            <div className="flex flex-row w-full md:w-auto items-center">
              <Link href="/">
                <Image
                  src={logoPicker()}
                  alt="Logo with leaf"
                  width={isMobile ? 100 : 135}
                  height={100}
                />
              </Link>
              <div className="hidden md:flex flex-row mx-5 bg-[#F0F0F0] rounded-xl items-center px-5 h-12">
                <SearchIcon className="text-[#9C9D9E]" />
                <input
                  onKeyDown={searchFunction}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder="محصول، برند یا دسته مورد نظرتان را جستجو کنید."
                  className="text-sm bg-[#F0F0F0] outline-none text-black px-2 md:w-[300px] lg:w-[500px]"
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-5 text-[#313131]">
              {user ? (
                <UserDropDown user={user} />
              ) : (
                <Link href={`/login?returnPage=${pathname}`}>
                  <button className="hidden xl:flex flex-row items-center gap-4 border border-[#adadad] rounded-xl px-5 py-2 mx-2">
                    <p>ورود</p>
                    <div className="w-[1.5px] h-5 bg-[#666]"></div>
                    <p className="">ثبت نام</p>
                  </button>
                  <LogInIcon
                    className="xl:hidden"
                    size={isMobile ? 24 : 32}
                    color="#666666"
                  />
                </Link>
              )}
              <div className="w-[1px] h-7 bg-[#d3d3d3]"></div>
              <CartDropDown />
            </div>
          </div>
          {!isFixed && (
            <div
              className={`hidden md:flex flex-row items-center gap-8 w-full m-auto max-w-[1600px]`}
            >
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
              <CategoryItem
                title="فروشنده شو!"
                image="/images/seller-icon.svg"
                path={"https://seller.chidamo.com/"}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
