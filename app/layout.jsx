import Header from "@/components/Header/Header";
import "../styles/globals.css";

const metadata = {
  title: "Chidamo",
  description: "Chidamo website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        <div className="pt-[183px]">{children}</div>
      </body>
    </html>
  );
}
