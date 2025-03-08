import { AtSign, ChevronLeft, Phone, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    title: "سفارشات جاری",
    icon: "/images/current-orders.svg",
    data: 12,
  },
  {
    title: "سفارشات تحویل شده",
    icon: "/images/done-orders.svg",
    data: 134,
  },
  {
    title: "سفارشات مرجوعی",
    icon: "/images/returned-orders.svg",
    data: 4,
  },
];

export default function profile() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-10 border border-[#BEBEBE] rounded-md p-5">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <p className="font-medium">اطلاعات حساب کاربری</p>
            <div className="h-[2px] w-full bg-primary"></div>
          </div>
          <Link href={"/profile/userinfo"}>
            <div className="flex flex-row items-center gap-1 text-primary font-medium">
              <p className="text-sm">ویرایش</p>
              <ChevronLeft size={16} />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-row gap-2 items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <User2 />
            </div>
            <p className="text-gray-500">
              نام و نام خانوادگی:{" "}
              <span className="text-black font-medium">خلیل الله خلیلی</span>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <AtSign />
            </div>
            <p className="text-gray-500">
              ایمیل:{" "}
              <span className="text-black font-medium">
                sepantashafizadeh@gmail.com
              </span>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <Phone />
            </div>
            <p className="text-gray-500">
              تلفن همراه:{" "}
              <span className="text-black font-medium">09912404990</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 border border-[#BEBEBE] rounded-md p-5">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <p className="font-medium">سفارش های من</p>
            <div className="h-[2px] w-full bg-primary"></div>
          </div>
          <Link href={"/profile/orders"}>
            <div className="flex flex-row items-center gap-1 text-primary font-medium">
              <p className="text-sm">همه سفارش ها</p>
              <ChevronLeft size={16} />
            </div>
          </Link>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          {tiles.map((item) => (
            <div className="flex flex-col gap-5 items-center bg-gray-100 px-7 py-3 rounded-md">
              <div className="flex flex-row gap-1 items-center">
                <Image
                  src={item.icon}
                  alt="Orders Icon"
                  width={25}
                  height={20}
                />
                <p>{item.title}</p>
              </div>
              <p className="font-bold text-3xl">{item.data}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
