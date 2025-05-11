"use client";

import { useRouter } from "next/navigation";

export default function GoToTheOrderButton({ id }) {
  const router = useRouter();
  return (
    <button
      className="bg-primary rounded-md px-4 py-2 text-white"
      onClick={() => router.push(`/profile/orders/${id}`)}
    >
      جزئیات سفارش
    </button>
  );
}
