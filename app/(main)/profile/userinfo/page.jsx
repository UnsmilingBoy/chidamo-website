import {
  AtSign,
  BriefcaseBusiness,
  Edit,
  Phone,
  User2,
  UserSquareIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import EditUserInfoButton from "./components/EditUserInfoButton";
import { getUserInfo } from "@/lib/fetchUserInfo";

// async function getUserInfo(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/userinfo/${id}`, {
//     cache: "no-store",
//   });
//   const data = await res.json();
//   return data;
// }

export default async function UserInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let orders = null;
  let wpUser = null;
  let user = null;
  if (token) {
    const res = await fetch(`${process.env.BASE_URL}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      wpUser = await res.json();
      user = await getUserInfo(wpUser.id);
    }
  } else {
    redirect("/login");
  }
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex justify-between items-start border border-[#BEBEBE] rounded-md p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full text-sm md:text-base">
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
          <div className="flex flex-row items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <UserSquareIcon />
            </div>
            <p className="text-gray-500">
              نام کاربری:{" "}
              <span className="font-medium text-black">
                {user?.username || "بدون یوزرنیم."}
              </span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <BriefcaseBusiness />
            </div>
            <p className="text-gray-500">
              نوع کاربر:{" "}
              <span className="font-medium text-black">
                {user?.role == "customer" ? "مشتری" : "فروشنده" || "بدون رول."}
              </span>
            </p>
          </div>
        </div>
        <EditUserInfoButton
          id={wpUser.id}
          button={<Edit className="text-gray-500" />}
          email={user.email}
          firstName={user["first_name"]}
          lastName={user["last_name"]}
          phone={user["billing"]["phone"]}
        />
      </div>
    </div>
  );
}
