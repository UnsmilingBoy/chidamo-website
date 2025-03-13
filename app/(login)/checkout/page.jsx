import CartPricingInfo from "@/components/Cart/CartPricingInfo";
import CheckOutInputFields from "@/components/Checkout/CheckoutInputFields";
import { logoPicker } from "@/utils/SeasonChanger";
import { ArrowRight, Truck } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function getUserInfo(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/userinfo/${id}`);
  const data = await res.json();
  return data;
}

export default async function Checkout() {
  // const [selected, setSelected] = useState(0);

  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  // let user = null;
  // let wpUser = null;
  // if (token) {
  //   const res = await fetch(`${process.env.BASE_URL}/wp-json/wp/v2/users/me`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     cache: "no-store",
  //   });

  //   if (res.ok) {
  //     wpUser = await res.json();
  //     // user = await getUserInfo(14);
  //     return wpUser.id;
  //   }
  //   return "";
  // } else {
  //   redirect("/login");
  // }

  return (
    <div className="flex flex-col w-full m-auto max-w-[1250px] py-7 gap-5">
      <div className="relative flex w-full items-center border border-[#DEDEDE] px-5 py-5 rounded-lg justify-between">
        <Link href={"/cart"} className="flex gap-2">
          <ArrowRight />
          <p className="font-medium">آدرس و زمان ارسال</p>
        </Link>
        <Link href={"/"} className="flex items-center justify-center">
          <Image
            src={logoPicker()}
            alt="Chidamo Logo"
            width={110}
            height={40}
          />
        </Link>
        <div className="w-28 h-1"></div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col w-full border border-[#DEDEDE] gap-2 p-5 rounded-lg">
          <div
            className={`flex border-2 w-full cursor-pointer items-center border-[#DEDEDE] py-3 px-5 gap-4 rounded-lg`}
          >
            <Truck size={20} />
            <div className="flex flex-col gap-2">
              <p className="text-primary">ارسال به آدرس شما</p>
              <p className="text-gray-500">ADDRESS</p>
            </div>
          </div>
          <CheckOutInputFields />
        </div>
        <CartPricingInfo />
      </div>
    </div>
  );
}
