import MobilePricingOverview from "@/components/Product Page/MobilePricingOverview";
import PricingOverview from "@/components/Product Page/PricingOverview";
import ProductDetails from "@/components/Product Page/ProductDetails";
import ProductOverview from "@/components/Product Page/ProductOverview";
import RelatedProducts from "@/components/Product Page/RelatedProduct";
import { getProductPageData } from "@/lib/fetchProducts";
import Image from "next/image";

export default async function productPage({ params }) {
  const { id } = await params;
  const { product, relatedProducts, reviews } = await getProductPageData(id);

  const validations = {
    "7 روز ضمانت بازگشت کالا": ["/images/refund.png", 60],
    "پرداخت امن": ["/images/pardakhteamn.png", 60],
    "پرداخت قسطی": ["/images/qesti.png", 45],
    "ضمانت اصالت کالا": ["/images/verified.png", 60],
  };

  return (
    <div className="flex justify-center w-full p-6">
      <div className="flex flex-col gap-20 h-full w-full max-w-[1400px]">
        {/* PATH HERE (فروشگاه اینترنتی چیدامو / صنعت مد / کیف و کفش / کیف و کفش زنانه / کیف کج زنانه چرم طبیعی بز کد 01)  */}

        <section className="flex flex-row justify-between gap-10">
          {/*  Overview of the product (images, compact details and price) */}
          <ProductOverview reviews={reviews} product={product} />
          <PricingOverview display={"hidden xl:flex"} product={product} />
        </section>
        <div className="flex flex-row items-center justify-center w-full gap-12">
          {Object.keys(validations).map((key, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center gap-5 w-fit"
            >
              <Image
                src={validations[key][0]}
                width={validations[key][1]}
                height={60}
                alt="key"
              />
              <p className="text-[#414141] text-xs md:text-base text-center">
                {key}
              </p>
            </div>
          ))}
        </div>
        <section className="flex flex-row gap-10">
          <ProductDetails reviews={reviews} product={product} />
          {/* <div className="sticky top-36 h-full w-[400px]"> */}
          <PricingOverview
            display={"hidden xl:flex"}
            isSticky={true}
            product={product}
          />
          {/* </div> */}
        </section>
        <section>
          <RelatedProducts dataList={relatedProducts} />
        </section>
      </div>
      <MobilePricingOverview product={product} />
    </div>
  );
}
