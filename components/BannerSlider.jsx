"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider() {
  const banners = [
    "/images/banner-1.png",
    "/images/banner-2.png",
    "/images/banner-3.png",
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
    <Slider {...settings} className="overflow-hidden cursor-grab select-none">
      {banners.map((banner, index) => (
        <div key={index}>
          <img src={banner} alt={"Banner number" + index} />
        </div>
      ))}
    </Slider>
  );
}
