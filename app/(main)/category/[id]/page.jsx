import CategoryFilters from "@/components/Category Page/CategoryFilters";
import CategoryProducts from "@/components/Category Page/CategoryProducts";
import Link from "next/link";

// async function getProducts(id, params) {
//   const { available, min_price, max_price } = await params;
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(
//     baseUrl +
//       `/api/products?category=${id}&${
//         available ? "stock_status=" + available + "&" : ""
//       }${min_price ? "min_price=" + min_price + "&" : ""}${
//         max_price ? "max_price=" + max_price : ""
//       }`
//   );

//   const products = await res.json();
//   return products;
// }

// async function getCategoryInfo(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/categories/${id}`);
//   const category = await res.json();
//   return category;
// }

async function getCategoryAndProducts(id, params) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { available, min_price, max_price, order, orderBy } = await params;

  const productUrl =
    `${baseUrl}/api/products?category=${id}` +
    `${order ? `&order=${order}` : ""}` +
    `${orderBy ? `&orderBy=${orderBy}` : ""}` +
    `${available ? `&stock_status=${available}` : ""}` +
    `${min_price ? `&min_price=${min_price}` : ""}` +
    `${max_price ? `&max_price=${max_price}` : ""}`;

  const categoryUrl = `${baseUrl}/api/categories/${id}`;

  const [productsRes, categoryRes] = await Promise.all([
    fetch(productUrl),
    fetch(categoryUrl),
  ]);

  const [products, category] = await Promise.all([
    productsRes.json(),
    categoryRes.json(),
  ]);

  return { products, category };
}

export default async function CategoryPage({ params, searchParams }) {
  const { id } = await params;
  // const { available } = await searchParams;
  // const { min_price } = await searchParams;
  // const { max_price } = await searchParams;

  // const products = await getProducts(id, searchParams);
  // const category = await getCategoryInfo(id);

  const { products, category } = await getCategoryAndProducts(id, searchParams);

  return (
    <div className="py-5 max-w-[1340px] m-auto px-5">
      {!products.length ? (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <p>کالایی یافت نشد.</p>
        </div>
      ) : (
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
          <CategoryProducts products={products} />
        </div>
      )}
    </div>
  );
}
