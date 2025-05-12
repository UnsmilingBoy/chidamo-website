import Image from "next/image";
import { redirect } from "next/navigation";
import GoToTheOrderButton from "../components/GoToTheOrderButton";

async function submitOrder(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/submitorder/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "processing",
      set_paid: true,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Order submission failed");
  }

  return { data: data, status: res.status };
}

export default async function OrderResult({ params, searchParams }) {
  const { id } = await params;
  const { trans_id, id_get } = await searchParams;

  let result;

  try {
    const formData = new URLSearchParams();
    formData.append("trans_id", trans_id);
    formData.append("id_get", id_get);
    formData.append("api", process.env.BANK_API);
    formData.append("json", "1");

    const res = await fetch("https://bitpay.ir/payment/gateway-result-second", {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    result = await res.json();
    if (result.status == 1) {
      const { data, status } = await submitOrder(id);
      console.log(data);
      console.log(status);
    }
  } catch (err) {
    console.error("BitPay verification failed:", err);
    result = { status: "error", message: "Verification failed" };
  }

  return (
    <div className="w-full justify-center items-center h-[50vh]">
      {result.status == 1 ? (
        <div className="flex flex-col w-full justify-center items-center my-20 gap-5">
          <Image
            src={"/images/payment-success.png"}
            width={170}
            height={170}
            alt="Payment done"
          />
          <div className="flex flex-col items-center gap-2 text-lg">
            <p>تراکنش موفقیت آمیز بود.</p>
            <p>شماره تراکنش: {trans_id}</p>
            <p>شماره سفارش: {id}</p>
          </div>
          <GoToTheOrderButton id={id} />
        </div>
      ) : result.status == 11 ? (
        redirect(`/profile/orders/${id}`)
      ) : (
        <div className="flex flex-col w-full justify-center items-center my-20 gap-5">
          <Image
            src={"/images/payment-failed.png"}
            width={170}
            height={170}
            alt="Payment done"
          />
          <p>تراکنش موفقیت آمیز نبود.</p>
        </div>
      )}
    </div>
  );
}
