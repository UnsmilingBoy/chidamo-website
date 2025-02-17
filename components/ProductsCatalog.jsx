"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductTile from "@/components/ProductTile";

export default function ProductsCatalog({ products }) {
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
    <section className="flex flex-col gap-3 border border-[#b1b1b1] rounded-xl p-7">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-medium">انواع کیف در چیدامو</p>
        <button className="flex flex-row items-center gap-2 px-2 bg-primary rounded-md">
          <p className="text-white">مشاهده همه</p>
          <Image
            src="/images/left-arrow.svg"
            width={7}
            height={10}
            alt="Left Arrow"
          />
        </button>
      </div>
      <div className="relative w-full cursor-grab py-5 select-none">
        <Swiper spaceBetween={10} slidesPerView={6}>
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex gap-[10px] items-center">
                <ProductTile
                  productId={item.id}
                  image={offersData[index][0]}
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
