export default function ProductAttributes({ attributesList }) {
  return (
    <div className="flex flex-col gap-2 p-4 text-sm border-2 rounded-2xl border-primary max-w-[500px]">
      {attributesList.length ? (
        attributesList.map((att, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex flex-row gap-7">
              <p className="text-[#767676]">{att["name"]}:</p>
              <p className="font-medium">{att["options"].join(", ")}</p>
            </div>
            {index != attributesList.length - 1 && (
              <div className="h-[1px] w-full bg-[#D9D9D9]"></div>
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[100px]">
          <p>مشخصاتی برای این محصول وجود ندارد.</p>
        </div>
      )}
    </div>
  );
}
