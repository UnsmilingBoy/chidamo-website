import Cat from "@/app/(login)/cat/page";
import PricingOverview from "@/components/Product Page/PricingOverview";
import ProductDetails from "@/components/Product Page/ProductDetails";
import ProductOverview from "@/components/Product Page/ProductOverview";
import RelatedProducts from "@/components/Product Page/RelatedProduct";
import StickyComponent from "@/components/Sticky";
import Image from "next/image";

async function getProductData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/products/${id}`);
  const data = await res.json();
  return data;
}

async function getRelatedProducts(ids) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(baseUrl + `/api/products?include=${ids}`);
  const relatedProducts = await res.json();
  return relatedProducts;
}

export default async function productPage({ params }) {
  const { id } = await params;
  const data = await getProductData(id);

  let relatedIds = "";
  for (let i = 0; i < data["related_ids"].length; i++) {
    if (i != data["related_ids"].length - 1) {
      relatedIds += `${data["related_ids"][i]},`;
    } else {
      relatedIds += data["related_ids"][i];
    }
  }

  const relatedProductsData = await getRelatedProducts(relatedIds);

  const validations = {
    "7 روز ضمانت بازگشت کالا": ["/images/refund.png", 60],
    "پرداخت امن": ["/images/pardakhteamn.png", 60],
    "پرداخت قسطی": ["/images/qesti.png", 45],
    "ضمانت اصالت کالا": ["/images/verified.png", 60],
  };

  return (
    <div className="flex flex-col px-14 py-10 gap-20">
      {/* PATH HERE (فروشگاه اینترنتی چیدامو / صنعت مد / کیف و کفش / کیف و کفش زنانه / کیف کج زنانه چرم طبیعی بز کد 01)  */}

      <section className="flex flex-row gap-10 justify-between">
        {/*  Overview of the product (images, compact details and price) */}
        <ProductOverview product={data} />
        <PricingOverview product={data} />
      </section>
      <div className="flex flex-row justify-center gap-12 w-full items-center">
        {Object.keys(validations).map((key, index) => (
          <div key={index} className="flex flex-row gap-5 w-fit items-center">
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
        <ProductDetails product={data} />
        <div className="sticky top-52 h-full">
          <PricingOverview product={data} />
        </div>
      </section>
      <section>
        <RelatedProducts dataList={relatedProductsData} />
      </section>
    </div>
  );
}
