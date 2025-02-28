export async function getProducts(searchParams) {
  const baseURL = "https://your-woocommerce-site.com/wp-json/wc/v3/products";
  const queryParams = new URLSearchParams({
    stock_status: searchParams.available === "true" ? "instock" : "", // Filter by availability
    per_page: "10", // Adjust pagination
    consumer_key: process.env.CONSUMER,
    consumer_secret: process.env.WC_CONSUMER_SECRET,
  });

  const res = await fetch(`${baseURL}?${queryParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const products = await getProducts(searchParams);

  return (
    <div>
      <h1>Products</h1>
      <ProductFilter />
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
