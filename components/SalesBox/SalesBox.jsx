"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductTile from "../ProductTile";

export default function SalesBox({ products }) {
  const offersData = [
    ["/images/kafsh.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    ["/images/atr.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    [
      "/images/kife-narenji.jpg",
      "کیف فانتزی هرمی دخترونه چرم طبیعی بز",
      "290000",
    ],
    ["/images/kafsh.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    ["/images/atr.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    [
      "/images/kife-narenji.jpg",
      "کیف فانتزی هرمی دخترونه چرم طبیعی بز",
      "290000",
    ],
    ["/images/kafsh.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    ["/images/atr.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    [
      "/images/kife-narenji.jpg",
      "کیف فانتزی هرمی دخترونه چرم طبیعی بز",
      "290000",
    ],
    ["/images/kafsh.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    ["/images/atr.jpg", "کیف فانتزی هرمی دخترونه چرم طبیعی بز", "290000"],
    [
      "/images/kife-narenji.jpg",
      "کیف فانتزی هرمی دخترونه چرم طبیعی بز",
      "290000",
    ],
  ];

  return (
    <div className="flex flex-col rounded-2xl border-[7px] border-primary p-2">
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
      <div className="relative w-full cursor-grab py-5 select-none">
        <Swiper spaceBetween={15} slidesPerView={6}>
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductTile
                image={offersData[index][0]}
                title={item.name}
                price={item.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
