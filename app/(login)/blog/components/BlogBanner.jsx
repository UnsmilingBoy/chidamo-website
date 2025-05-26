"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

export default function BlogBanner({ posts }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize(); // Run on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <Slider
      {...settings}
      className="overflow-hidden cursor-grab select-none max-w-[1920px] h-[300px] text-white"
    >
      {posts.map((post, index) => (
        <div key={index} className="flex flex-col relative h-[300px]">
          <div className="h-full w-3/5 sm:w-1/2 bg-black/80 right-0 absolute flex items-center">
            <div className="flex flex-col text-right mx-4 sm:mx-10 sm:my-5 gap-5">
              <h2
                className="text-white line-clamp-2 font-medium md:text-2xl"
                dir="rtl"
              >
                {post.title.rendered}
              </h2>
              <div
                className="text-sm line-clamp-4 sm:text-base text-justify text-[#d6d6d6]"
                dir="rtl"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="flex flex-row-reverse gap-2 items-center">
                <div className="w-1 h-5 bg-primary rounded-md"></div>
                <p className="text-[#d6d6d6] text-xs sm:text-base" dir="rtl">
                  نوشته شده توسط {post?._embedded?.author[0].name} | در{" "}
                  {post.date.split("T")[0].replaceAll("-", "/")}
                </p>
              </div>
            </div>
          </div>
          <img
            className="h-full w-full object-cover"
            src={
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/images/banner-2.png"
            }
            alt={"Banner number" + index}
          />
        </div>
      ))}
    </Slider>
  );
}
