import { cookies } from "next/headers";

async function getUserInfo(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/userinfo/${id}`);
  const data = await res.json();
  return data;
}

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
  console.log(user);
  return (
    <div className="flex flex-col w-full gap-5 text-sm font-medium text-gray-500">
      {user.billing["address_1"] ? (
        <div className="flex flex-col gap-10 border border-[#BEBEBE] rounded-md p-5">
          <p className="text-black">آدرس: {user.billing["address_1"]}</p>
          <p>شهر: {user.billing.city}</p>
          <p>کدپستی: {user.billing.postcode}</p>
          <p>شماره همراه: {user.billing.phone}</p>
          <p>
            نام گیرنده:{" "}
            {user.billing["first_name"] + " " + user.billing["last_name"]}
          </p>
        </div>
      ) : (
        <p>آدرسی پیدا نشد.</p>
      )}
    </div>
  );
}
