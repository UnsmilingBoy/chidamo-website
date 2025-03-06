import Image from "next/image";

export default function ProductGallery({ photosArray }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-96 h-96 rounded-lg">
        <Image
          className="w-full h-full object-cover rounded-md"
          src={photosArray[0]}
          alt="Product picture"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-row gap-4">
        {photosArray.map((pic, index) => (
          <div
            key={index}
            className="w-20 h-20 rounded-lg border-2 border-[#767676] overflow-hidden"
          >
            <Image
              className="w-full h-full object-cover rounded-md"
              src={"/images/atr.jpg"}
              alt="Product picture"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
