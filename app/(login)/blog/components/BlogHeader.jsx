import { logoPicker } from "@/utils/SeasonChanger";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

export default function BlogHeader() {
  return (
    <header className="w-full items-center p-3 shadow-md">
      <div className=" flex flex-row gap-2 max-w-[1350px] m-auto">
        <Image src={logoPicker()} alt="Logo" width={135} height={135} />
        <div className="hidden sm:flex flex-row mx-5 bg-[#F0F0F0] rounded-xl items-center px-5 h-12">
          <SearchIcon className="text-[#9C9D9E]" />
          <input
            //   onKeyDown={searchFunction}
            //   value={inputValue}
            //   onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="مطلب مورد نظر خود را جستجو کنید.."
            className="text-sm bg-[#F0F0F0] outline-none text-black px-2 md:w-[300px] lg:w-[500px]"
          />
        </div>
      </div>
    </header>
  );
}
