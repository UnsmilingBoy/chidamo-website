import { currentSeasonPersian } from "@/utils/SeasonChanger";
import Image from "next/image";
import Link from "next/link";

export default function Ad() {
  return (
    <aside className="flex flex-row justify-evenly items-center w-full h-12 bg-primary select-none cursor-pointer ">
      <Link href={"/onsale"}>
        <div className="flex flex-row gap-3 items-center">
          <p className="text-white font-bold animate-pulse text-sm md:text-lg">
            تخفیفات {currentSeasonPersian()} چیدامو
          </p>
          <div className="flex flex-row gap-2 items-center bg-[#FEC30C] rounded-2xl px-2 md:px-3">
            <p className="text-[#282828] text-sm md:text-base">خرید</p>
            <Image
              src="/images/left-arrow-black.svg"
              alt="Left arrow"
              width={12}
              height={7}
            />
          </div>
        </div>
      </Link>
    </aside>
  );
}
