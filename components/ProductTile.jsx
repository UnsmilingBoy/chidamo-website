import { primaryColor } from "@/utils/SeasonChanger";
import { toPersianPrice } from "@/utils/toPersianNumber";
import Image from "next/image";
import Link from "next/link";

export default function ProductTile({
  image,
  title,
  price,
  productId,
  onSalePrice,
}) {
  return (
    <Link href={`/product/${productId}`}>
      <div className="flex flex-col items-center border gap-2 p-[15px] hover:bg-slate-50 h-full">
        <div className="w-full aspect-[3/4] overflow-hidden p-2">
          <Image
            src={image}
            width={200}
            height={400}
            className="object-cover w-full h-full rounded-md"
            alt="Product image"
          />
        </div>
        <div className="flex flex-col justify-between w-full h-20">
          <p className="w-full line-clamp-2 text-right text-sm font-medium text-[#3a3a3a]">
            {title}
          </p>
          {onSalePrice != "" && (
            <p className="w-full text-left font-bold text-primary text-lg">
              {toPersianPrice(onSalePrice) + " تومان"}
            </p>
          )}
          <p
            className={`w-full text-left font-bold ${
              onSalePrice != ""
                ? "text-gray-600 line-through"
                : "text-primary text-lg"
            }`}
          >
            {toPersianPrice(price) + " تومان"}
          </p>
        </div>
      </div>
    </Link>
  );
}
