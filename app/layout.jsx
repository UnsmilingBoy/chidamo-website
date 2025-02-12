import Header from "@/components/Header/Header";
import "../styles/globals.css";

const metadata = {
  title: "Chidamo",
  description: "Chidamo website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <Header />
        <div className="pt-44">{children}</div>
      </body>
    </html>
  );
}
