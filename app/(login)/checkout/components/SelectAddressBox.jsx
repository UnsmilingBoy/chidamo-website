"use client";

import CheckOutInputFields from "@/components/Checkout/CheckoutInputFields";
import { Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartPricingInfo from "@/components/Cart/CartPricingInfo";

export default function SelectAddressBox({ address }) {
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function handleCompleteOrder() {
    console.log(form);
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
          <div className="flex flex-col gap-2">
            <p className="text-primary">ارسال به آدرس شما</p>
            <p className="text-gray-500">{address || "آدرسی یافت نشد."}</p>
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
