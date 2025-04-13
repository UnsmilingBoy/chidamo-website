export async function searchForProduct({ query, params, categoryId }) {
  const { available, min_price, max_price, order, orderBy, page, on_sale } =
    await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    baseUrl +
      `/api/products?` +
      `${categoryId ? `&category=${categoryId}` : ""}` +
      `${query ? `&search=${query}` : ""}` +
      `${order ? `&order=${order}` : ""}` +
      `${orderBy ? `&orderBy=${orderBy}` : ""}` +
      `${available ? `&stock_status=${available}` : ""}` +
      `${min_price ? `&min_price=${min_price}` : ""}` +
      `${max_price ? `&max_price=${max_price}` : ""}` +
      `${on_sale ? `&on_sale=${on_sale}` : ""}` +
      `${page ? `&page=${page}` : ""}`
  );
  const results = await res.json();
  const products = results.products;
  const pages = results.totalPages;
  return { products, pages };
}

export async function getCategoryAndProducts(id, params) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { available, min_price, max_price, order, orderBy, page } =
    await params;

  const productUrl =
    `${baseUrl}/api/products?category=${id}` +
    `${order ? `&order=${order}` : ""}` +
    `${orderBy ? `&orderBy=${orderBy}` : ""}` +
    `${available ? `&stock_status=${available}` : ""}` +
    `${min_price ? `&min_price=${min_price}` : ""}` +
    `${max_price ? `&max_price=${max_price}` : ""}` +
    `${page ? `&page=${page}` : ""}`;
  const categoryUrl = `${baseUrl}/api/categories/${id}`;

  const [productsRes, categoryRes] = await Promise.all([
    fetch(
      productUrl
      //   , {
      //   cache: "force-cache",
      // }
    ),
    fetch(categoryUrl, {
      cache: "force-cache",
    }),
  ]);

  const [productsList, category] = await Promise.all([
    productsRes.json(),
    categoryRes.json(),
  ]);
  const products = productsList.products;
  const pages = productsList.totalPages;
  return { products, category, pages };
}

export async function getProductPageData(productId) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const productUrl = `${baseUrl}/api/products/${productId}`;
  const reviewsUrl = `${baseUrl}/api/reviews?productId=${productId}`;

  // Fetch product first to get related IDs
  const productRes = await fetch(productUrl, {
    cache: "force-cache",
  });
  const product = await productRes.json();

  const relatedIds = product["related_ids"]?.join(",") || "";
  const relatedUrl = `${baseUrl}/api/products?include=${relatedIds}`;

  // Fetch related products and reviews in parallel
  const [relatedRes, reviewsRes] = await Promise.all([
    fetch(relatedUrl, {
      cache: "force-cache",
    }),
    fetch(reviewsUrl, {
      cache: "force-cache",
    }),
  ]);

  const [relatedProductsList, reviews] = await Promise.all([
    relatedRes.json(),
    reviewsRes.json(),
  ]);

  const relatedProducts = relatedProductsList.products;

  return {
    product,
    relatedProducts,
    reviews,
  };
}
