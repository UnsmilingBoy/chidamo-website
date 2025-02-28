import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategoryProducts from "@/components/Category Page/CategoryProducts";
import Link from "next/link";

async function getProducts(id, available) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    baseUrl + `/api/products?category=${id}&stock_status=${available || ""}`
  );
  const products = await res.json();
  return products;
}

async function getCategoryInfo(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/categories/${id}`);
  const category = await res.json();
  return category;
}

export default async function CategoryPage({ params, searchParams }) {
  const { id } = await params;
  const { available } = await searchParams;

  const products = await getProducts(id, available);
  const category = await getCategoryInfo(id);

  return (
    <div className="p-6 flex justify-center w-full">
      <div className="flex flex-col gap-7">
        <p className="text-sm text-[#797979] font-medium">
          {<Link href={"/"}>فروشگاه اینترنتی چیدامو</Link>}
          <span> / </span>
          {
            <Link className="text-[#505050]" href={`/category/${id}`}>
              {category.name}
            </Link>
          }
        </p>
        <div className="flex flex-row gap-10">
          <CategoryFilters />
          <CategoryProducts products={products} />
        </div>
      </div>
    </div>
  );
}
