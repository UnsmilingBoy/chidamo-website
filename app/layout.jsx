import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";

export const metadata = {
  title: "فروشگاه اینترنتی چیدامو",
  description: "My App Description",
  icons: "/favicon.ico",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
