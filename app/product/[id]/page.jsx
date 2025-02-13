export default async function productPage({ params }) {
  const { id } = await params;
  return <div>PRODUCT NUMBER {id}</div>;
}
