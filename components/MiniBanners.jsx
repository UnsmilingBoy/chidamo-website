import { currentSeason } from "@/utils/SeasonChanger";
import Image from "next/image";

export default function MiniBanner() {
  let season = currentSeason();
  const banners = [
    `/images/category-minibanner-${season}-1.png`,
    `/images/category-minibanner-${season}-2.png`,
    `/images/category-minibanner-${season}-3.png`,
    `/images/category-minibanner-${season}-4.png`,
  ];

  return (
    <section className="flex flex-row justify-between my-12">
      {banners.map((item, index) => (
        <Image
          className="select-none cursor-pointer"
          width={300}
          height={100}
          key={index}
          src={item}
          alt={`Category banner number ${index}`}
        />
      ))}
    </section>
  );
}
