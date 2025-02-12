import Image from "next/image";

export default function SalesBox() {
  return (
    <div className="flex flex-col h-[2000px] rounded-2xl border-[7px] border-primary p-2">
      <div className="flex flex-row-reverse relative items-center px-7 py-5 rounded-md text-white bg-primary">
        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
          تخفیفات زمستانه چیدامو
        </div>
        <div className="flex flex-row gap-3">
          نمایش همه
          <Image
            src="/images/left-arrow.svg"
            alt="Left arrow"
            width={7}
            height={30}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2"></div>
    </div>
  );
}
