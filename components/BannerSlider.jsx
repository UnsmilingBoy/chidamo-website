"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

export default function BannerSlider() {
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
    "/images/banner-1.png",
    "/images/banner-2.png",
    "/images/banner-3.png",
  ];
  const bannersMobile = [
    "/images/banner-4-mobile.png",
    "/images/banner-4-mobile.png",
    "/images/banner-4-mobile.png",
  ];

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider
      {...settings}
      className="overflow-hidden cursor-grab select-none max-w-[1920px]"
    >
      {isMobile
        ? bannersMobile.map((banner, index) => (
            <div key={index}>
              <img src={banner} alt={"Banner number" + index} />
            </div>
          ))
        : banners.map((banner, index) => (
            <div key={index}>
              <img src={banner} alt={"Banner number" + index} />
            </div>
          ))}
    </Slider>
  );
}
