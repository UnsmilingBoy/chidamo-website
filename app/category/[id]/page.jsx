import ProductTile from "@/components/ProductTile";
import { notFound } from "next/navigation";

async function getProducts(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/products?category=${id}`);
  const products = await res.json();
  return products;
}

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const products = await getProducts(id);

  return (
    <div className="p-6">
      <p className="text-3xl font-bold">{id}</p>
      <div className="flex flex-row gap-10">
        <div className="flex flex-row w-96 h-screen border border-[#BBB] rounded-md"></div>
        <div className="grid grid-cols-5">
          {products.map((product, index) => (
            <ProductTile
              key={index}
              image="/images/kafsh.jpg"
              price={product.price}
              title={product.name}
              productId={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
