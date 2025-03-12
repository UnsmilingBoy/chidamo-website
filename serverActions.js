"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function completeOrder() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login?returnPage=/cart");
  } else {
    redirect("/checkout");
  }
}
