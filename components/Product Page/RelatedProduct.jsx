import ProductTile from "../ProductTile";

export default function RelatedProducts({ dataList }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-lg">محصولات مشابه</p>
      <div className="flex flex-row">
        {dataList.map((product, index) => (
          <div key={index} className="w-56">
            <ProductTile
              image={product?.images?.[0]?.src || "/images/atr.jpg"}
              title={product.name}
              productId={product.id}
              onSalePrice={product["sale_price"]}
              price={"regular_price"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
