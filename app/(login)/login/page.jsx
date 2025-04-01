import LoginPage from "@/components/LoginForm/LoginForms";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPageServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
