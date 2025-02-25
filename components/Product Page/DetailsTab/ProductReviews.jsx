import { toPersianNumber } from "@/utils/toPersianNumber";
import {
  ListFilter,
  MessageCircle,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import PricingOverview from "../PricingOverview";

export default function ProdcutReviews({ reviews, product }) {
  function ratingCalculator(rating, size) {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.unshift(
        <Star key={i} size={size} className="text-[#FEC30C] fill-[#FEC30C]" />
      );
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.unshift(
        <Star key={i + 10} size={size} className="text-[#D9D9D9]" />
      );
    }
    return <div className="flex flex-row">{stars}</div>;
  }
  const sortBy = ["جدیدترین", "قدیمی ترین", "بیشترین امتیاز", "کمترین امتیاز"];
  const comments = [
    {
      username: "خلیلالله خلیلی",
      rating: 4,
      date: "1403/09/01",
      data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
    },
    {
      username: "خلیلالله خلیلی زاده",
      rating: 2,
      date: "1403/09/01",
      data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
    },
    {
      username: "خلیلالله زاده",
      rating: 3,
      date: "1403/09/01",
      data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
    },
    {
      username: "خلیلالله خلیلی زاده",
      rating: 1,
      date: "1403/09/01",
      data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
    },
  ];
  const [isSelected, setIsSelected] = useState(0);
  return (
    <div className="flex flex-row justify-between gap-10">
      <div className="flex flex-col gap-7 w-full">
        <div className="flex flex-row gap-7 text-sm items-center bg-productPageLightPrimaryColor py-3 px-6 rounded-md">
          <div className="flex flex-row gap-1 items-center">
            <ListFilter size={20} />
            <p className="font-medium">ترتیب:</p>
          </div>
          {sortBy.map((item, index) => (
            <p
              key={index}
              className={`cursor-pointer ${
                isSelected == index
                  ? "text-primary font-medium"
                  : "text-[#7A7A7A]"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-5 px-5 py-2">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-2 items-center">
                <User />
                <p>{comment.username}</p>
              </div>
              {ratingCalculator(comment.rating, 16)}
              <p className="text-sm text-[#878787]">{comment.date}</p>
            </div>
            <p className="text-sm">{comment.data}</p>
            <div className="w-full h-[1px] bg-[#B6B6B6]"></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-10 w-[500px]">
        <div className="flex flex-col gap-2 items-center">
          <p className="font-bold text-5xl text-primary">
            {toPersianNumber(product["average_rating"])}
          </p>
          <p className="font-medium">18 دیدگاه</p>
          {ratingCalculator(parseInt(product["average_rating"], 10), 24)}
        </div>
        <div className="flex flex-col p-7 bg-[#F6F6F6] rounded-md gap-5">
          <div className="flex flex-row gap-2 items-center">
            <MessageCircle size={20} />
            <p className="font-medium text-sm">
              نظر خود را در مورد این محصول بنویسید.
            </p>
          </div>
          <button className="px-10 py-3 bg-primary text-white rounded-md">
            افزودن نظر
          </button>
        </div>
      </div>
    </div>
  );
}
