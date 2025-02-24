import PricingOverview from "@/components/Product Page/PricingOverview";
import ProductDetails from "@/components/Product Page/ProductDetails";
import ProductOverview from "@/components/Product Page/ProductOverview";
import RelatedProducts from "@/components/Product Page/RelatedProduct";
import MUIProvider from "@/providers/MUIProvider";

async function getProductData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/products/${id}`);
  const data = await res.json();
  return data;
}

export default async function productPage({ params }) {
  const { id } = await params;
  const data = await getProductData(id);
  console.log(data);
  return (
    <div className="flex flex-col px-14 py-10">
      {/* PATH HERE (فروشگاه اینترنتی چیدامو / صنعت مد / کیف و کفش / کیف و کفش زنانه / کیف کج زنانه چرم طبیعی بز کد 01)  */}
      <MUIProvider>
        <section className="flex flex-row gap-10 justify-between">
          {/*  Overview of the product (images, compact details and price) */}
          <ProductOverview product={data} />
          <PricingOverview product={data} />
        </section>
      </MUIProvider>
      <section>
        <ProductDetails />
      </section>
      <section>
        <RelatedProducts />
      </section>
    </div>
  );
}
