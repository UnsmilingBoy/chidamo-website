import CartPricingInfo from "@/components/Cart/CartPricingInfo";
import { getUserInfo } from "@/lib/fetchUserInfo";
import { logoPicker } from "@/utils/SeasonChanger";
import { ArrowRight, Truck } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SelectAddressBox from "./components/SelectAddressBox";

export default async function Checkout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;
  let wpUser = null;
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
    redirect("/login?returnPage=checkout");
  }

  return (
    <div className="flex flex-col w-full m-auto max-w-[1250px] py-7 px-5 gap-5">
      <div className="relative flex w-full items-center border border-[#DEDEDE] px-5 py-7 rounded-lg justify-between">
        <Link href={"/cart"} className="flex gap-2">
          <ArrowRight />
          <p className="font-medium hidden sm:block">آدرس و زمان ارسال</p>
        </Link>
        <Link
          href={"/"}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={logoPicker()}
            alt="Chidamo Logo"
            width={110}
            height={40}
          />
        </Link>
        <div className="w-28 h-1"></div>
      </div>
      <SelectAddressBox address={user.billing["address_1"]} />
    </div>
  );
}
