import PricingOverview from "@/components/Product Page/PricingOverview";
import ProductDetails from "@/components/Product Page/ProductDetails";
import ProductOverview from "@/components/Product Page/ProductOverview";
import RelatedProducts from "@/components/Product Page/RelatedProduct";

export default async function productPage({ params }) {
  const { id } = await params;
  return (
    <div className="flex flex-col p-6">
      {/* PATH HERE (فروشگاه اینترنتی چیدامو / صنعت مد / کیف و کفش / کیف و کفش زنانه / کیف کج زنانه چرم طبیعی بز کد 01)  */}
      <section className="flex flex-row">
        {/*  Overview of the product (images, compact details and price) */}
        <ProductOverview />
        <PricingOverview />
      </section>
      <section>
        <ProductDetails />
      </section>
      <section>
        <RelatedProducts />
      </section>
    </div>
  );
}
