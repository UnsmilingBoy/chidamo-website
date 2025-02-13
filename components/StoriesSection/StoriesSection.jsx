import Image from "next/image";

export default function StoriesSection() {
  const data = [
    ["عطر و ادکلن", "/images/atr.jpg"],
    ["کیف و کفش", "/images/kafsh.jpg"],
    ["عطر و ادکلن", "/images/atr.jpg"],
    ["کیف و کفش", "/images/kafsh.jpg"],
    ["عطر و ادکلن", "/images/atr.jpg"],
    ["کیف و کفش", "/images/kafsh.jpg"],
    ["عطر و ادکلن", "/images/atr.jpg"],
    ["کیف و کفش", "/images/kafsh.jpg"],
    ["عطر و ادکلن", "/images/atr.jpg"],
    ["کیف و کفش", "/images/kafsh.jpg"],
  ];

  return (
    <section className="flex flex-row justify-between my-10">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <div className="rounded-full w-24 h-24 overflow-hidden border-[3px] border-primary p-[3px]">
            <Image
              className="object-cover w-full h-full rounded-full"
              src={item[1]}
              width={100}
              height={40}
              alt={`Image id ${index}`}
            />
          </div>
          <p className="text-sm">{item[0]}</p>
        </div>
      ))}
    </section>
  );
}
