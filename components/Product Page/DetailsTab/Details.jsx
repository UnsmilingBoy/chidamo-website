export default function Details() {
  const detailsList = {
    جنس: "چرم",
    "بند و دستگیره": "بند دوشی",
    "نحوه بسته شدن کیف و حوله": "زیپ",
    "جنس قفل": "فلز آبکاری",
  };
  return (
    <div className="flex flex-col gap-3">
      {Object.keys(detailsList).map((key, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 bg-[#F6F6F6] rounded-lg px-5 py-2"
        >
          <p className="font-medium">{key}:</p>
          <p className="text-[#212121]">{detailsList[key]}</p>
        </div>
      ))}
    </div>
  );
}
