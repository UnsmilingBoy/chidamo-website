import toPersianNumber from "@/utils/toPersianNumber";
import Image from "next/image";

export default function ProductTile({ image, title, price }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full h-52 overflow-hidden">
        <Image
          src={image}
          width={1000}
          height={400}
          className="object-cover w-full h-full rounded-md"
          alt="Product image"
        />
      </div>
      <p className="w-full text-right text-sm font-medium text-[#3a3a3a]">
        {title}
      </p>
      <p className="w-full text-left font-bold text-primary">
        {toPersianNumber(price) + " تومان"}
      </p>
    </div>
  );
}
