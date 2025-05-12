import { fetchWithRetry } from "@/lib/fetchWithRetry";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export async function getOrderDetails(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/orders/${id}`);
  const orders = await res.json();
  return orders;
}

export default async function OrderPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let order = null;
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
      order = await getOrderDetails(id);
    }
  } else {
    redirect("/login");
  }
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col border border-[#BEBEBE] rounded-md">
        <div className="flex flex-row justify-between py-5 border-b border-[#BEBEBE] px-5">
          <div className="flex flex-row gap-2 items-center">
            <Link href={"/profile/orders"}>
              <ArrowRight />
            </Link>
            <p className="font-medium">جزئیات سفارش</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5 text-sm text-gray-500 border-b border-[#Bebebe]">
          <div className="flex flex-row gap-10 justify-start">
            <p>
              کد پیگیری سفارش:{" "}
              <span className="text-black font-medium">{order.id}</span>
            </p>
            <p>
              تاریخ ثبت سفارش:{" "}
              <span className="text-black font-medium">
                {order["date_created"]}
              </span>
            </p>
          </div>
          <div className="h-[1px] m-auto bg-gray-200 w-full"></div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-10 justify-start">
              <p>
                تحویل گیرنده:{" "}
                <span className="text-black font-medium">{`${order.shipping["first_name"]} ${order.shipping["last_name"]}`}</span>
              </p>
              <p>
                شماره موبایل:{" "}
                <span className="text-black font-medium">
                  {order.shipping.phone}
                </span>
              </p>
            </div>
            <p>
              آدرس:{" "}
              <span className="text-black font-medium">
                {order.shipping["address_1"]}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5 text-sm text-gray-500 border-b border-[#bebebe]">
          <div className="flex flex-row gap-5">
            <p>
              مبلغ:{" "}
              <span className="text-black font-medium">
                {order.total} تومان
              </span>
            </p>
            <p className="font-medium">پرداخت اینترنتی</p>
          </div>
          <p>
            هزینه ارسال: <span className="font-medium text-black">80,000</span>
          </p>
        </div>
        <div className="flex flex-col">
          {order["line_items"].map((product, index) => (
            <Link
              key={index}
              href={`/product/${product["product_id"]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`flex flex-row gap-4 items-center ${
                  !index == order["line_items"].length - 1 &&
                  "border-b border-[#BEBEBE]"
                } p-5`}
              >
                <Image
                  src={product?.image?.src || "/images/no-image.jpg"}
                  className="w-[100px] sm:w-[150px] rounded-md"
                  width={150}
                  height={50}
                  alt="Product Image"
                />
                <div className="flex flex-col gap-3">
                  <p className="font-medium">{product.name}</p>
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <p>
                      تعداد: <span>{product.quantity}</span>
                    </p>
                    <p>
                      قیمت: <span>{product.price} تومان</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
