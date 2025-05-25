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
  const banners = [
    ["/images/banner-1.png", "/category/90"],
    ["/images/banner-2.png", "/category/88"],
    ["/images/banner-3.png", "/category/90"],
  ];
  const bannersMobile = [
    ["/images/banner-4-mobile.png"],
    ["/images/banner-2-mobile.png", "/category/90"],
  ];

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
      {isMobile
        ? bannersMobile.map((banner, index) => (
            // <Link href={banner[1]} key={index}>
            <div key={index}>
              <img src={banner[0]} alt={"Banner number" + index} />
            </div>
            // </Link>
          ))
        : posts.map((post, index) => (
            <div key={index} className="flex flex-col relative h-full">
              <div className="h-full w-1/2 bg-black/80 right-0 absolute">
                <div className="flex flex-col text-right mx-10 my-5 gap-5">
                  <h2 className="text-white font-medium line-clamp-2" dir="rtl">
                    {post.title.rendered}
                  </h2>
                  <div
                    className="text-base text-justify text-[#d6d6d6]"
                    dir="rtl"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="flex flex-row-reverse gap-2 items-center">
                    <div className="w-1 h-5 bg-primary rounded-md"></div>
                    <p className="text-[#d6d6d6]" dir="rtl">
                      نوشته شده توسط {post?._embedded?.author[0].name} | در{" "}
                      {post.date.split("T")[0].replaceAll("-", "/")}
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="h-full w-full"
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
