import Image from "next/image";

export default function Ad() {
  return (
    <aside className="flex flex-row justify-evenly items-center w-full h-12 bg-primary select-none cursor-pointer ">
      <Image
        className="object-cover"
        src="/images/barg.png"
        width={95}
        height={20}
        alt="Leaf image"
      />
      <div className="flex flex-row gap-3">
        <p className="text-lg text-white font-bold animate-pulse">
          تخفیفات زمستانه چیدامو
        </p>
        <div className="flex flex-row gap-2 items-center bg-[#FEC30C] rounded-2xl px-3">
          <p className="text-[#282828]">خرید</p>
          <Image
            src="/images/left-arrow-black.svg"
            alt="Left arrow"
            width={12}
            height={7}
          />
        </div>
      </div>
      <Image
        className="object-cover"
        src="/images/barg.png"
        width={95}
        height={20}
        alt="Leaf image"
      />
    </aside>
  );
}
