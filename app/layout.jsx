import localFont from "next/font/local";
import MiniLoader from "@/components/MiniLoader";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";

const shabnam = localFont({
  src: "../public/fonts/Shabnam-FD.ttf",
  display: "swap", // Ensures smooth loading
  variable: "--font-shabnam", // Defines a global CSS variable
});

export const metadata = {
  title: "فروشگاه اینترنتی چیدامو",
  description: "My App Description",
  icons: "/favicon.ico",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={shabnam.variable}>
      <body>
        <MiniLoader />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
