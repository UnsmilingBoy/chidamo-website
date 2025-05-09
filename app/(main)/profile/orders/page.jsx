import { getUserOrders } from "@/lib/fetchUserInfo";
import { fetchWithRetry } from "@/lib/fetchWithRetry";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// export async function getUserOrders(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/orders?customer=${id}`);
//   const orders = await res.json();
//   return orders;
// }

export default async function Orders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let orders = null;
  let user = null;
  if (token) {
    const res = await fetchWithRetry(
      `${process.env.BASE_URL}/wp-json/wp/v2/users/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (res.ok) {
      user = await res.json();
      orders = await getUserOrders(user.id);
    }
  } else {
    redirect("/login");
  }
  // console.log(orders);
  return (
    <div className="flex flex-col w-full gap-5">
      {!orders.length ? (
        <div className="flex items-center justify-center w-full h-[50vh]">
          <p className="text-sm font-medium text-gray-500">سفارشی پیدا نشد.</p>
        </div>
      ) : (
        orders.map((order, index) => (
          <Link href={`/profile/orders/${order.id}`} key={index}>
            <div className="flex flex-col cursor-pointer rounded-md gap-2 border border-[#BEBEBE] p-5">
              <div className="flex flex-row justify-between w-full text-sm font-medium">
                {order.status == "completed" ? (
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src={"/images/done-orders.svg"}
                      width={20}
                      height={20}
                      alt="Done Orders"
                    />
                    <p>تکمیل شده</p>
                  </div>
                ) : order.status == "cancelled" ? (
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src={"/images/returned-orders.svg"}
                      width={18}
                      height={20}
                      alt="Done Orders"
                    />
                    <p>لغو شده</p>
                  </div>
                ) : (
                  <p>در حال انجام</p>
                )}
                <ChevronLeft size={18} />
              </div>
              <div className="flex flex-row justify-start gap-5 text-sm text-gray-500">
                <p className="">{order["date_created"]}</p>
                <p>
                  کد سفارش:{" "}
                  <span className="font-medium text-black">{order.id}</span>
                </p>
                <p>
                  مبلغ:{" "}
                  <span className="font-medium text-black">
                    {order.total} تومان
                  </span>
                </p>
              </div>
              <div className="h-[1px] w-full bg-[#bebebe] my-3"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-start w-full">
                {order["line_items"].map((product, index) => (
                  <Image
                    key={index}
                    src={product?.image?.src || "/images/no-image.jpg"}
                    width={100}
                    height={60}
                    alt="Product Picture"
                  />
                ))}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
