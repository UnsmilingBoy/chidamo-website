export default async function SearchResult({ params, searchParams }) {
  const { query } = await params;
  const { page } = await searchParams;

  // const { products, pages } = await searchForProduct({
  //   query: query,
  //   params: searchParams,
  // });

  return <div className="">{query}</div>;
}
