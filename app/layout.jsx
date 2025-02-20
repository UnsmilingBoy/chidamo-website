// app/layout.js
import "@/styles/globals.css";

export const metadata = {
  title: "Chidamo",
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
