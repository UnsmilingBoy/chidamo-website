import localFont from "next/font/local";
import MiniLoader from "@/components/MiniLoader";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";

const shabnam = localFont({
  src: [
    {
      path: "../public/fonts/Shabnam-FD.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Shabnam-Medium-FD.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-shabnam",
});

export const metadata = {
  title: "فروشگاه اینترنتی چیدامو",
  description: "My App Description",
  icons: "/favicon.ico",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${shabnam.variable}`}>
      <body>
        <MiniLoader />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
