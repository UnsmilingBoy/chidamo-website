import Image from "next/image";
import Link from "next/link";

export default function StoriesSection() {
  const data = [
    ["اکسسوری مردانه", "/images/keychain.jpg", "116"],
    ["اکسسوری زنانه", "/images/necklace.jpg", "117"],
    ["عطر و ادکلن", "/images/atr.jpg", "88"],
    ["پوشاک بچگانه", "/images/kidsclothing.png", "108"],
    ["پوشاک زنانه", "/images/womenclothing.png", "107"],
    ["پوشاک مردانه", "/images/pooshaak.jpg", "106"],
  ];

  return (
    <section className="flex flex-row justify-evenly my-10 w-full overflow-scroll gap-5 scrollbar-none">
      {data.map((item, index) => (
        <Link key={index} href={`/category/${item[2]}`}>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full w-[70px] h-[70px] md:w-24 md:h-24 overflow-hidden border-[2px] md:border-[3px] border-primary">
              <Image
                className="object-cover w-full h-full rounded-full"
                src={item[1]}
                width={100}
                height={40}
                alt={`Image id ${index}`}
              />
            </div>
            <p className="text-sm text-center">{item[0]}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
