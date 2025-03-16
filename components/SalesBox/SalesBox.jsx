"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductTile from "../ProductTile";
import Link from "next/link";

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
    <section className="flex flex-col rounded-2xl border-[7px] border-primary p-2">
      <div className="flex flex-row-reverse relative items-center px-7 py-5 rounded-md text-white bg-primary">
        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
          تخفیفات زمستانه چیدامو
        </div>
        <div className="flex flex-row gap-3">
          <p className="hidden lg:block">نمایش همه</p>
          <Image
            src="/images/left-arrow.svg"
            alt="Left arrow"
            width={7}
            height={30}
          />
        </div>
      </div>
      <div className="relative w-full cursor-grab py-5 select-none">
        <Swiper
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 2 }, // 1 slide for small screens
            600: { slidesPerView: 3 },
            768: { slidesPerView: 4 }, // 2 slides for tablets
            1024: { slidesPerView: 6 }, // 3 slides for desktops
          }}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex gap-[10px] items-center">
                <ProductTile
                  productId={item.id}
                  image={item?.images[0]?.src || "/images/atr.jpg"}
                  title={item.name}
                  price={item["regular_price"]}
                  onSalePrice={item["sale_price"]}
                />

                {/* {index < products.length - 1 && (
                  <div className="w-[1px] bg-[#dadada] h-[280px]"></div>
                )} */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
