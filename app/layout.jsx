// app/layout.js
import "@/styles/globals.css";

export const metadata = {
  title: "فروشگاه اینترنتی چیدامو",
  description: "My App Description",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
