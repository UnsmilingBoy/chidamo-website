import Image from "next/image";

export default function ProductGallery({ photosArray }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-auto aspect-square sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-lg">
        <Image
          className="w-full h-full object-cover rounded-md"
          src={photosArray[0] || "/images/no-image.jpg"}
          alt="Product picture"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-row gap-4">
        {photosArray.map((pic, index) => (
          <div
            key={index}
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg border-2 border-[#767676] overflow-hidden"
          >
            <Image
              className="w-full h-full object-cover rounded-md"
              src={pic || "/images/no-image.jpg"}
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
