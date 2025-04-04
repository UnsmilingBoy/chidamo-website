import { MessageCircle, Star, User, X } from "lucide-react";
import { useState } from "react";
import AddAReview from "./AddAReview";

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

  // const comments = [
  //   {
  //     username: "خلیلالله خلیلی",
  //     rating: 4,
  //     date: "1403/09/01",
  //     data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
  //   },
  //   {
  //     username: "خلیلالله خلیلی زاده",
  //     rating: 2,
  //     date: "1403/09/01",
  //     data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
  //   },
  //   {
  //     username: "خلیلالله زاده",
  //     rating: 3,
  //     date: "1403/09/01",
  //     data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
  //   },
  //   {
  //     username: "خلیلالله خلیلی زاده",
  //     rating: 1,
  //     date: "1403/09/01",
  //     data: "فوق العاده زیبا و با کیفیت. با تشکر از چیدامو برای ارسال سریع!",
  //   },
  // ];

  // const comments = [];
  // for (let i = 0; i < reviews.length; i++) {

  // }

  const [isSelected, setIsSelected] = useState(0);
  const [overlay, setOverlay] = useState(true);
  return (
    <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-10">
      {reviews.length ? (
        <div className="flex flex-col gap-7 w-full">
          {/* <div className="hidden md:flex flex-row gap-7 text-sm items-center bg-productPageLightPrimaryColor py-3 px-6 rounded-md">
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
          </div> */}
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-5 px-5 py-2">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2 items-center">
                  <User />
                  <p>{review.reviewer}</p>
                </div>
                {ratingCalculator(review.rating, 16)}
                <p className="text-sm text-[#878787]">
                  {review["date_created"].replace("T", " - ")}
                </p>
              </div>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: review.review }}
              />
              <div className="w-full h-[1px] bg-[#B6B6B6]"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[300px] flex justify-center items-center">
          <p className="text-sm text-gray-600">
            دیدگاهی برای این محصول ثبت نشده.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-10 w-full md:w-[500px]">
        <div className="flex flex-col gap-2 items-center">
          <p className="font-bold text-5xl text-primary">
            {product["average_rating"]}
          </p>
          <p className="font-medium">{reviews.length} دیدگاه</p>
          {ratingCalculator(parseInt(product["average_rating"], 10), 24)}
        </div>
        <div className="flex flex-col p-7 bg-[#F6F6F6] rounded-md gap-5">
          <div className="flex flex-row gap-2 items-center">
            <MessageCircle size={20} />
            <p className="font-medium text-sm">
              نظر خود را در مورد این محصول بنویسید.
            </p>
          </div>
          <AddAReview id={product.id} button={"افزودن نظر"} />
        </div>
      </div>
      {/* {overlay && (
        <div className="fixed h-screen w-screen inset-0 z-[9999999999] bg-black/50 flex justify-center items-center">
          <div className="flex p-5 m-5 bg-white rounded-md w-[500px]">
            <div className="flex justify-between w-full">
              <p className="font-bold text-lg">ثبت دیدگاه</p>
              <X />
            </div>

          </div>
        </div>
      )} */}
    </div>
  );
}
