import LoginPage from "@/components/LoginForm/LoginForms";
import { Suspense } from "react";

export default function LoginPageServer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
