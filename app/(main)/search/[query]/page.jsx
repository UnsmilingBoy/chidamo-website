import ProductTile from "@/components/ProductTile";

async function searchForProduct(query) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/products?search=${query}`);
  const results = await res.json();
  return results;
}

export default async function searchResult({ params }) {
  const { query } = await params;
  const results = await searchForProduct(query);
  return (
    <div className="p-6">
      <p>Search result for {query}</p>
      <div className="flex flex-row gap-10">
        <div className="flex flex-row w-96 border border-[#BBB] rounded-md"></div>
        <div className="w-full grid grid-cols-5">
          {results.map((product, index) => (
            <ProductTile
              key={index}
              title={product.name}
              productId={product.id}
              image="/images/atr.jpg"
              price={product["regular_price"]}
              onSalePrice={product["sale_price"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
