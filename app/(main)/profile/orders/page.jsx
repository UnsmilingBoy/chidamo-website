import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserOrders(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/orders?customer=${id}`);
  const orders = await res.json();
  return orders;
}

export default async function Orders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let orders = null;
  let user = null;
  if (token) {
    const res = await fetch(`${process.env.BASE_URL}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      user = await res.json();
      orders = await getUserOrders(14);
    }
  } else {
    redirect("/login");
  }
  console.log(orders);
  return (
    <div className="w-full flex flex-col gap-5">
      {!orders.length ? (
        <div className="w-full flex h-full justify-center items-center">
          <p>سفارشی پیدا نشد.</p>
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col rounded-md border border-[#BEBEBE] p-5"
          >
            <div className="flex flex-row w-full justify-between text-sm">
              {order.status == "completed" ? (
                <p>تکمیل شده</p>
              ) : order.status == "cancelled" ? (
                <p>لغو شده</p>
              ) : (
                <p>در حال انجام</p>
              )}
              <ChevronLeft size={18} />
            </div>
            <div className="flex flex-row justify-start gap-5 text-sm text-gray-500">
              <p className="">{order["date_created"]}</p>
              <p>
                کد سفارش:{" "}
                <span className="text-black font-medium">{order.id}</span>
              </p>
              <p>
                مبلغ:{" "}
                <span className="text-black font-medium">
                  {order.total} تومان
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
