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
    infinite: true, // Infinite loop
    speed: 500, // Animation speed in milliseconds
    slidesToShow: 1, // Number of slides visible at a time
    slidesToScroll: 1, // Number of slides scrolled at a time
    autoplay: true, // Automatic sliding
    autoplaySpeed: 3000, // Delay between slides in autoplay
  };

  return (
    <Slider {...settings} className="overflow-hidden cursor-grab">
      {banners.map((banner, index) => (
        <div key={index}>
          <img src={banner} alt={banner + index} />
        </div>
      ))}
    </Slider>
  );
}
