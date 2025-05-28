import Footer from "@/components/Footer/Footer";
import BlogHeader from "./components/BlogHeader";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <BlogHeader />
      {children}
      <Footer />
    </div>
  );
}
