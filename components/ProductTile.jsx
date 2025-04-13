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
  stockStatus,
}) {
  return (
    <Link
      href={`/product/${productId}`}
      // target="_blank"
      // rel="noopener noreferrer"
    >
      <div className="flex flex-col items-center border gap-2 p-1 md:p-[15px] hover:bg-slate-50 h-full">
        <div className="w-full aspect-square overflow-hidden p-1">
          <Image
            src={image}
            width={200}
            height={400}
            className="object-cover w-full h-full rounded-md"
            alt="Product image"
          />
        </div>
        <div className="flex flex-col justify-between w-full h-21">
          <p className="w-full line-clamp-2 text-right text-sm font-medium text-[#3a3a3a]">
            {title}
          </p>
          {onSalePrice != "" && (
            <p className="w-full text-left font-bold text-primary text-lg">
              {toPersianPrice(onSalePrice) + " تومان"}
            </p>
          )}
          {stockStatus == "outofstock" ? (
            <p>ناموجود</p>
          ) : (
            <p
              className={`w-full text-left font-bold ${
                onSalePrice != ""
                  ? "text-gray-600 line-through"
                  : "text-primary text-lg"
              }`}
            >
              {toPersianPrice(price) + " تومان"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
