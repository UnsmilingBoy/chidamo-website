import { Edit } from "lucide-react";
import { cookies } from "next/headers";
import EditAddressButton from "./components/EditAddressButton";
import { getUserInfo } from "@/lib/fetchUserInfo";

// async function getUserInfo(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/userinfo/${id}`, {
//     cache: "no-store",
//   });
//   const data = await res.json();
//   return data;
// }

export default async function Addresses() {
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
  // console.log(user);
  return (
    <div className="flex flex-col w-full gap-5 text-sm font-medium text-gray-500">
      {user.shipping["address_1"] ? (
        <div className="flex justify-between items-start border border-[#BEBEBE] rounded-md p-5">
          <div className="flex flex-col gap-10">
            <p className="text-black">آدرس: {user.shipping["address_1"]}</p>
            <p>شهر: {user.shipping.city}</p>
            <p>کدپستی: {user.shipping.postcode}</p>
            <p>شماره همراه: {user.shipping.phone}</p>
            <p>
              نام گیرنده:{" "}
              {user.shipping["first_name"] + " " + user.shipping["last_name"]}
            </p>
          </div>
          <div className="flex gap-2">
            <EditAddressButton
              button={<Edit />}
              id={wpUser.id}
              city={user.shipping.city}
              address={user.shipping["address_1"]}
              postcode={user.shipping.postcode}
              phone={user.shipping.phone}
              firstName={user.shipping["first_name"]}
              lastName={user.shipping["last_name"]}
            />
            {/* <EditAddressButton
              button={<Trash color="red" />}
              id={wpUser.id}
              city={""}
              address={""}
              postcode={""}
              phone={""}
              firstName={""}
              lastName={""}
            /> */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col gap-3 justify-center items-center h-[50vh] m-auto">
            <p className="">آدرسی پیدا نشد.</p>
            <EditAddressButton
              id={wpUser.id}
              address={""}
              city={""}
              firstName={""}
              lastName={""}
              phone={""}
              postcode={""}
              button={
                <p className="bg-primary p-2 text-white rounded-md">
                  افزودن آدرس
                </p>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
