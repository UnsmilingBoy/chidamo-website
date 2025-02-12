import Image from "next/image";

export default function Ad() {
  return (
    <div className="flex flex-row justify-evenly items-center w-full h-12 bg-primary">
      <Image
        className="object-cover"
        src="/images/barg.png"
        width={95}
        height={20}
        alt="Leaf image"
      />
      <p className="text-lg text-white font-bold">تخفیفات زمستانه چیدامو</p>
      <Image
        className="object-cover"
        src="/images/barg.png"
        width={95}
        height={20}
        alt="Leaf image"
      />
    </div>
  );
}
