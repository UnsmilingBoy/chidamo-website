export default function Details({ attributes }) {
  // const detailsList = {
  //   جنس: "چرم",
  //   "بند و دستگیره": "بند دوشی",
  //   "نحوه بسته شدن کیف و حوله": "زیپ",
  //   "جنس قفل": "فلز آبکاری",
  // };

  return (
    <div className="flex flex-col gap-3">
      {attributes.length ? (
        Object.keys(attributes).map((key, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-[#F6F6F6] rounded-lg px-5 py-2"
          >
            <p className="font-medium">{attributes[index]["name"]}:</p>
            <p className="text-[#212121]">
              {attributes[index]["options"].join(", ")}
            </p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500">مشخصاتی برای این محصول وجود ندارد.</p>
        </div>
      )}
    </div>
  );
}
