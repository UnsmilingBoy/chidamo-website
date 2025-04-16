"use client";

import Image from "next/image";
import HeadlessSwitch from "../Switch";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilters({
  setLoading,
  overlayVersion,
  setOverlay,
}) {
  const [expandPriceFilter, setExpandPriceFilter] = useState(true);

  const [enableAvailability, setEnableAvailability] = useState(false);
  const [enableOnSale, setEnableOnSale] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [minPriceError, setMinPriceError] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [maxPriceError, setMaxPriceError] = useState(false);

  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const initMinPrice = params.get("min_price");
  const initMaxPrice = params.get("max_price");

  const maxAllowedPrice = 20000000;
  const minAllowedPrice = 0;

  function handleBoolFilter(paramName, paramValue) {
    if (setOverlay) {
      setOverlay(false);
    }
    setLoading(true);
    setIsLoading(true);

    if (params.get(paramName) === paramValue) {
      params.delete(paramName);
    } else {
      params.set(paramName, paramValue);
    }

    router.push(`${pathName}?${params.toString()}`);
  }

  function handlePriceFilter() {
    if (initMaxPrice == maxPrice && initMinPrice == minPrice) {
      if (setOverlay) {
        setOverlay(false);
      } else {
        return "";
      }
    } else if (minPrice > maxPrice) {
      setMinPriceError(true);
    } else if (minPrice < minAllowedPrice || minPrice > maxAllowedPrice) {
      setMinPriceError(true);
      setMinPrice(minAllowedPrice);
    } else if (maxPrice > maxAllowedPrice || maxPrice < minAllowedPrice) {
      setMaxPriceError(true);
      setMaxPrice(maxAllowedPrice);
    } else {
      if (setOverlay) {
        setOverlay(false);
      }
      setLoading(true);
      setIsLoading(true);
      params.set("min_price", minPrice);
      params.set("max_price", maxPrice);

      router.push(`${pathName}?${params.toString()}`);
    }
  }

  useEffect(() => {
    const isInStock = searchParams.get("available") === "instock";
    const isOnSale = searchParams.get("on_sale") === "true";
    setEnableAvailability(isInStock);
    setEnableOnSale(isOnSale);

    setIsLoading(false);
  }, [searchParams]);

  return (
    <div
      className={`${
        overlayVersion ? "flex" : "hidden"
      } md:flex flex-col items-start ${
        overlayVersion ? "w-full" : "w-[400px]"
      } border border-[#d3d3d3] rounded-md h-fit`}
    >
      {!overlayVersion && (
        <div className="flex flex-row p-4 w-full gap-2 items-center border-b border-[#BBB] font-medium text-[#4A4A4A]">
          <Image
            src="/images/filter-icon.svg"
            width={20}
            height={20}
            alt="Filter icon"
          />
          <p>فیلتر ها</p>
        </div>
      )}
      <div className="flex flex-row w-full items-center justify-between p-3 cursor-pointer">
        <p>فقط کالا های موجود</p>

        {isLoading ? (
          <div className=" px-2">
            <div className="w-5 h-5 border-2 border-t-transparent border-[#4A4A4A] rounded-full animate-spin"></div>
          </div>
        ) : (
          <HeadlessSwitch
            enable={enableAvailability}
            setEnable={setEnableAvailability}
            handleSwitch={() => handleBoolFilter("available", "instock")}
          />
        )}
      </div>
      <div className="flex flex-row w-full items-center justify-between p-3 cursor-pointer">
        <p>کالا های تخفیف دار</p>

        {isLoading ? (
          <div className=" px-2">
            <div className="w-5 h-5 border-2 border-t-transparent border-[#4A4A4A] rounded-full animate-spin"></div>
          </div>
        ) : (
          <HeadlessSwitch
            enable={enableOnSale}
            setEnable={setEnableOnSale}
            handleSwitch={() => handleBoolFilter("on_sale", "true")}
          />
        )}
      </div>
      <div
        // onClick={() => setExpandPriceFilter(!expandPriceFilter)}
        className="flex flex-row w-full items-center justify-between p-3"
      >
        <p>بر اساس قیمت</p>
        {/* {expandPriceFilter ? <ChevronUp /> : <ChevronDown />} */}
      </div>
      {expandPriceFilter && (
        <div className="flex flex-col gap-3 w-full items-center py-4">
          <div className="flex flex-col">
            <p className="text-sm text-[#575757]">از قیمت:</p>
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              className={`${
                minPriceError && "outline-red-700"
              } bg-[#F0F0F0] outline-none rounded-md p-2`}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[#575757]">تا قیمت:</p>
            <input
              value={maxPrice}
              type="number"
              onChange={(e) => setMaxPrice(e.target.value)}
              className={`bg-[#F0F0F0] ${
                maxPriceError && "outline-red-700"
              } outline-none rounded-md p-2 w-full`}
            />
          </div>
          <button
            disabled={isLoading}
            onClick={() => handlePriceFilter()}
            className={`px-3 py-2 my-2 rounded-md text-white text-sm ${
              isLoading ? "bg-primary/60" : "bg-primary"
            }`}
          >
            اعمال فیلتر
          </button>
        </div>
      )}
    </div>
  );
}
