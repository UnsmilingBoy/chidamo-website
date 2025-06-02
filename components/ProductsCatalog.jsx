"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductTile from "@/components/ProductTile";
import Link from "next/link";

export default function ProductsCatalog({ products }) {
  return (
    <section className="flex flex-col gap-3 border border-[#b1b1b1] rounded-xl sm:p-7 p-4">
      <div className="flex flex-row justify-between">
        <p className="text-base md:text-xl font-medium">
          انواع اکسسوری در چیدامو
        </p>
        <Link
          href={"/category/88"}
          className="flex flex-row items-center gap-2"
        >
          <p className="text-primary font-medium text-sm md:text-base">
            مشاهده همه
          </p>
          <Image
            src="/images/left-arrow.svg"
            width={5}
            height={10}
            alt="Left Arrow"
          />
        </Link>
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
                  image={item?.images[0]?.src}
                  title={item.name}
                  price={item["regular_price"]}
                  onSalePrice={item["sale_price"]}
                  stockStatus={item["stock_status"]}
                  rating={item["average_rating"]}
                  ratingCount={item["rating_count"]}
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
