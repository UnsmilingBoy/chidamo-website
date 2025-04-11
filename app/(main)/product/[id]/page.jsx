import MobilePricingOverview from "@/components/Product Page/MobilePricingOverview";
import PricingOverview from "@/components/Product Page/PricingOverview";
import ProductDetails from "@/components/Product Page/ProductDetails";
import ProductOverview from "@/components/Product Page/ProductOverview";
import RelatedProducts from "@/components/Product Page/RelatedProduct";
import StoriesSection from "@/components/StoriesSection/StoriesSection";
import Image from "next/image";

// async function getProductData(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/products/${id}`);
//   const data = await res.json();
//   return data;
// }

// async function getRelatedProducts(ids) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/products?include=${ids}`);
//   const relatedProducts = await res.json();
//   return relatedProducts;
// }

// async function getReviews(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(baseUrl + `/api/reviews?productId=${id}`);
//   const reviews = await res.json();
//   return reviews;
// }

async function getProductPageData(productId) {
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

  const [relatedProducts, reviews] = await Promise.all([
    relatedRes.json(),
    reviewsRes.json(),
  ]);

  return {
    product,
    relatedProducts,
    reviews,
  };
}

export default async function productPage({ params }) {
  const { id } = await params;
  // const data = await getProductData(id);

  // let relatedIds = "";
  // for (let i = 0; i < data["related_ids"].length; i++) {
  //   if (i != data["related_ids"].length - 1) {
  //     relatedIds += `${data["related_ids"][i]},`;
  //   } else {
  //     relatedIds += data["related_ids"][i];
  //   }
  // }

  // const relatedProductsData = await getRelatedProducts(relatedIds);

  // const reviews = await getReviews(id);

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
              <p className="text-[#414141] text-sm">{key}</p>
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
