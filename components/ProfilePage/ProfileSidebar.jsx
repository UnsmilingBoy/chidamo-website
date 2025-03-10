"use client";

import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  MapPinHouse,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function handleLogout() {
  await fetch("/api/logout", { method: "POST" });
  window.location.reload(); // Refresh to clear auth state
}

const tabs = [
  {
    name: "پیشخوان",
    icon: <LayoutDashboard size={20} />,
    href: "/profile",
  },
  {
    name: "سفارش ها",
    icon: <PackageOpen size={20} />,
    href: "/profile/orders",
  },
  {
    name: "آدرس",
    icon: <MapPinHouse size={20} />,
    href: "/profile/addresses",
  },
  {
    name: "جزئیات حساب",
    icon: <CircleUserRound size={20} />,
    href: "/profile/userinfo",
  },
  {
    name: "خروج از حساب",
    icon: <LogOut size={20} />,
    href: "logout",
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-fit gap-1 border border-[#BEBEBE] rounded-md p-3 w-[400px] text-sm">
      {tabs.map((item, index) => (
        <Link
          onClick={() => {
            if (item.href == "logout") {
              handleLogout();
            }
          }}
          href={item.href}
          key={index}
        >
          <div
            className={`flex flex-row items-center rounded-md gap-1 py-3 px-3 font-medium ${
              item.href == "logout" && "text-red-700"
            }  ${
              pathname == item.href
                ? "bg-primary text-white font-bold"
                : pathname.includes("orders") && item.href.includes("orders")
                ? "bg-primary text-white font-bold"
                : "text-[#242424]"
            } `}
          >
            {item.icon}
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
