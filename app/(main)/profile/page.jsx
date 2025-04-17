import { getUserOrders } from "@/lib/fetchUserInfo";
import { AtSign, ChevronLeft, Phone, User2 } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// async function getUserInfo(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/userinfo/${id}`);
//   const data = await res.json();
//   return data;
// }

// export async function getUserOrders(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/orders?customer=${id}`);
//   const orders = await res.json();
//   return orders;
// }

export default async function profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("PROFILE PAGE'S TOKEN IS: " + token);
  let user = null;
  let wpUser = null;
  let orders = null;
  let completed = 0;
  let cancelled = 0;
  let onGoing = 0;

  if (token) {
    const res = await fetch(`${process.env.BASE_URL}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      user = await res.json();
      // user = await getUserInfo(wpUser.id);
      orders = await getUserOrders(user.id);
      for (let i = 0; i < orders.length; i++) {
        switch (orders[i].status) {
          case "completed":
            completed++;
            break;
          case "cancelled":
            cancelled++;
            break;
          default:
            onGoing++;
            break;
        }
      }
    }
  } else {
    redirect("/login?returnPage=profile");
  }

  const tiles = [
    {
      title: "سفارشات جاری",
      icon: "/images/current-orders.svg",
      data: onGoing,
    },
    {
      title: "سفارشات تحویل شده",
      icon: "/images/done-orders.svg",
      data: completed,
    },
    {
      title: "سفارشات لغو شده",
      icon: "/images/returned-orders.svg",
      data: cancelled,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col gap-10 border border-[#BEBEBE] rounded-md p-5">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <p className="font-medium">اطلاعات حساب کاربری</p>
            <div className="h-[2px] w-full bg-primary"></div>
          </div>
          <Link href={"/profile/userinfo"}>
            <div className="flex flex-row items-center gap-1 font-medium text-primary">
              <p className="text-sm">ویرایش</p>
              <ChevronLeft size={16} />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-row items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <User2 />
            </div>
            <p className="text-gray-500">
              نام و نام خانوادگی:{" "}
              <span className="font-medium text-black">
                {`${user["first_name"]} ${user["last_name"]}`}
              </span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <AtSign />
            </div>
            <p className="text-gray-500">
              ایمیل:{" "}
              <span className="font-medium text-black">{user.email}</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <Phone />
            </div>
            <p className="text-gray-500">
              تلفن همراه:{" "}
              <span className="font-medium text-black">
                {user?.billing?.phone || "شماره ای وارد نشده است."}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 border border-[#BEBEBE] rounded-md p-5">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <p className="font-medium">سفارش های من</p>
            <div className="h-[2px] w-full bg-primary"></div>
          </div>
          <Link href={"/profile/orders"}>
            <div className="flex flex-row items-center gap-1 font-medium text-primary">
              <p className="text-sm">همه سفارش ها</p>
              <ChevronLeft size={16} />
            </div>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row w-full justify-evenly">
          {tiles.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-5 py-3 bg-gray-100 rounded-md px-7"
            >
              <div className="flex flex-row items-center gap-1">
                <Image
                  src={item.icon}
                  alt="Orders Icon"
                  width={25}
                  height={20}
                />
                <p>{item.title}</p>
              </div>
              <p className="text-3xl font-bold">{item.data}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
