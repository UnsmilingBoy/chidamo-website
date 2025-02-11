import { Search, ShoppingCart } from "@mui/icons-material";
import Image from "next/image";
import CategoryItem from "./CategoryItem";

export default function Header() {
  return (
    <div className="fixed bg-white w-full flex flex-col py-5 px-20 gap-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Image
            src="/images/logowithleaf.svg"
            alt="Logo with leaf"
            width={155}
            height={100}
          />
          <div className="flex flex-row mx-5 bg-[#F0F0F0] rounded-xl items-center px-5">
            <Search className="text-[#9C9D9E]" />
            <input
              type="text"
              placeholder="محصول، برند یا دسته مورد نظرتان را جستجو کنید."
              className="bg-[#F0F0F0] outline-none text-black px-2  w-[500px]"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 text-[#313131]">
          <button className="flex flex-row items-center gap-4 border border-[#666] rounded-xl px-5 py-2 mx-2">
            <p>ورود</p>
            <div className="w-[1.5px] h-5 bg-[#666]"></div>
            <p>ثبت نام</p>
          </button>
          <div className="w-[1px] h-7 bg-[#666]"></div>
          <button>
            <img src="/images/shopping-cart.svg" alt="Shopping cart icon" />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center gap-8">
        <CategoryItem title="دسته بندی محصولات" image="/images/category.svg" />
        <div className="w-[1px] h-4 bg-[#b9b9b9]"></div>
        <CategoryItem
          title="محصولات تخفیف دار"
          image="/images/sales-icon.svg"
        />
        <CategoryItem title="پرفروش ترین ها" image="/images/fire-icon.svg" />
        <CategoryItem title="فروشنده شو!" image="/images/seller-icon.svg" />
      </div>
    </div>
  );
}
