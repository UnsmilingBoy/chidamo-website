import { toPersianPrice } from "@/utils/toPersianNumber";
import Image from "next/image";
import Link from "next/link";

export default function ProductTile({ image, title, price, productId }) {
  return (
    <Link href={`/product/${productId}`}>
      <div className="flex flex-col items-center gap-2 px-[10px]">
        <div className="w-full h-56 overflow-hidden">
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
          {toPersianPrice(price) + " تومان"}
        </p>
      </div>
    </Link>
  );
}
