import ProductTile from "../ProductTile";

export default function RelatedProducts({ dataList }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="font-bold text-lg">محصولات مشابه</p>
      <div className="flex flex-row w-full overflow-scroll overflow-y-auto scrollbar-none md:scrollbar-thin py-2">
        {dataList?.map((product, index) => (
          <div key={index} className="w-44 md:w-56 flex-none">
            <ProductTile
              image={product?.images?.[0]?.src || "/images/atr.jpg"}
              title={product.name}
              productId={product.id}
              onSalePrice={product["sale_price"]}
              price={product["regular_price"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
