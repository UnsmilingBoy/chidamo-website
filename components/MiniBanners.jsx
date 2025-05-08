import { currentSeason } from "@/utils/SeasonChanger";
import Image from "next/image";
import Link from "next/link";

export default function MiniBanner() {
  let season = currentSeason();
  const banners = [
    [`/images/category-minibanner-${season}-1.png`, "57"],
    [`/images/category-minibanner-${season}-2.png`, "20"],
    [`/images/category-minibanner-${season}-3.png`, "28"],
    [`/images/category-minibanner-${season}-4.png`, "20"],
  ];

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 justify-items-center my-12">
      {banners.map((item, index) => (
        <Link key={index} href={`/category/${item[1]}`}>
          <Image
            className="select-none cursor-pointer"
            width={300}
            height={100}
            src={item[0]}
            alt={`Category banner number ${index}`}
          />
        </Link>
      ))}
    </section>
  );
}
