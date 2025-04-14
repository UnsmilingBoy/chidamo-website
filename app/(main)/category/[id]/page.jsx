import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategoryProducts from "@/components/Category Page/CategoryProducts";
import { getCategoryAndProducts } from "@/lib/fetchProducts";
import Link from "next/link";

export default async function CategoryPage({ params, searchParams }) {
  const { id } = await params;
  const { page } = await searchParams;

  const { products, category, pages } = await getCategoryAndProducts(
    id,
    searchParams
  );

  return (
    <div className="py-5 max-w-[1340px] m-auto px-5">
      <div className="flex flex-col gap-7 w-full">
        <p className="text-sm text-[#797979] font-medium">
          {<Link href={"/"}>فروشگاه اینترنتی چیدامو</Link>}
          <span> / </span>
          {
            <Link className="text-[#505050]" href={`/category/${id}`}>
              {category.name}
            </Link>
          }
        </p>
        <CategoryProducts
          pages={pages}
          products={products}
          currentPage={page}
        />
      </div>
    </div>
  );
}
