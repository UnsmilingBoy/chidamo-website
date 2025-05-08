"use client";

import CheckOutInputFields from "@/components/Checkout/CheckoutInputFields";
import { Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartPricingInfo from "@/components/Cart/CartPricingInfo";
import Link from "next/link";

export default function SelectAddressBox({ address, id, fullAddress }) {
  const [selected, setSelected] = useState(0);
  const { cart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pelak: "",
    vahed: "",
    city: "",
    state: "",
    postcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function handleCompleteOrder() {
    let selectedAddress = selected ? form : fullAddress;
    if (selectedAddress == fullAddress) {
      if (fullAddress["address_1"]) {
        console.log({
          id: id,
          shipping: {
            ...selectedAddress,
          },
          line_items: {
            ...cart,
          },
        });
      } else {
        console.log("ERROR EMPTY ADDRESS");
      }
    } else {
      let error = false;
      Object.keys(form).map((key) => {
        if (form[key] == "") {
          console.log("Empty Form");
          error = true;
        }
      });
      if (!error) {
        console.log({
          id: id,
          shipping: {
            ...selectedAddress,
          },
          line_items: {
            ...cart,
          },
        });
      }
    }
  }
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <div className="flex flex-col w-full border border-[#DEDEDE] gap-2 p-5 rounded-lg">
        <div
          onClick={() => setSelected(0)}
          className={`flex border-2 w-full cursor-pointer items-center ${
            selected == 0 ? "border-primary" : "border-[#DEDEDE]"
          } py-3 px-5 gap-4 rounded-lg`}
        >
          <Truck size={20} />
          <div className="flex flex-col gap-2 w-full">
            <p className="text-primary">ارسال به آدرس شما</p>
            <div className="flex flex-row w-full justify-between">
              <p className="text-gray-500">{address || "آدرسی یافت نشد."}</p>
              <Link href={"/profile/addresses"}>
                <p className="text-sm font-medium text-primary">
                  تغییر یا افزودن آدرس
                </p>
              </Link>
            </div>
          </div>
        </div>
        <CheckOutInputFields
          selected={selected}
          setSelected={setSelected}
          form={form}
          handleChange={handleChange}
        />
      </div>
      <CartPricingInfo completeOrderFunc={handleCompleteOrder} />
    </div>
  );
}
