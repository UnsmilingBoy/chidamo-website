"use client";
import { toPersianNumber } from "@/utils/toPersianNumber";
import Image from "next/image";

export default function Footer({ categories }) {
  const socialMediaImageLinks = [
    "/images/twitter-logo.svg",
    "/images/telegram-logo.svg",
    "/images/instagram-logo.svg",
    "/images/youtube-logo.svg",
  ];

  const footerTitles = [
    "دسترسی سریع",
    // "انواع محصولات",
    "درباره ما",
    "قوانین و مقررات",
  ];

  const quickAccess = [
    "بلاگ",
    "خرید پوشاک",
    "محصولات هنری",
    "هنر های تجسمی",
    "هنر های دستی",
    "صنعت مد",
    "زیور آلات",
    "عطر و ادکلن",
    "محصولات پرفروش",
    "فروشنده شو!",
  ];

  const aboutUs = ["بلاگ", "سوالات متداول", "فروشگاه حضوری", "تماس با ما"];

  const rules = [
    "قوانین و مقررات",
    "حریم خصوصی کاربران",
    "از زبان مشتریان",
    "چرا چیدامو؟",
  ];
  const footerChilds = [quickAccess, aboutUs, rules];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col m-5 text-white">
      <div className="flex flex-col w-full py-10 px-20 bg-primary rounded-t-2xl">
        <div className="flex justify-between items-center w-full">
          <Image
            src="/images/footer-logo.svg"
            width={150}
            height={40}
            alt="Footer Logo"
          />
          <button
            onClick={scrollToTop}
            className="flex flex-row items-center p-4 bg-white text-black rounded-lg gap-7"
          >
            <p className="text-sm">بازگشت به بالا</p>
            <Image
              className="rotate-90"
              src="/images/left-arrow-black.svg"
              width={15}
              height={15}
              alt="Arrow"
            />
          </button>
        </div>
        <div className="w-full h-[1px] my-7 bg-white"></div>
        <div className="flex flex-row justify-evenly items-start">
          <div className="flex flex-col gap-7">
            <p>تلفن: 011-42198210 - 011-421123123</p>
            <p>ایمیل: info@Chidamo.ir</p>
            <div className="flex flex-col gap-5 p-3 bg-white rounded-md">
              <p className="font-medium text-black">شبکه های اجتماعی</p>
              <div className="flex flex-row gap-2 items-center justify-evenly">
                {socialMediaImageLinks.map((item, index) => (
                  <Image
                    src={item}
                    key={index}
                    alt={`Social Media Logo ${index}`}
                    width={27}
                    height={15}
                  />
                ))}
              </div>
            </div>
          </div>

          {footerTitles.map((title, i) => (
            <div key={`Key ${i}`} className="flex flex-col gap-1 ">
              <p className="mb-3 text-lg font-bold">{title}</p>
              {footerChilds[i].map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-14 bg-footer rounded-b-2xl">
        <p className="text-sm">
          {toPersianNumber(1403)} تمام حقوق مادی و معنوی این سایت متعلق به
          چیدامو می‌باشد.
        </p>
      </div>
    </div>
  );
}
