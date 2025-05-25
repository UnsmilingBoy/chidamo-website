"use client";

import { useRouter } from "next/navigation";

export default function BlogPagination({ pages, currentPage, setLoading }) {
  const router = useRouter();

  function handlePagination(index, currentPage) {
    if (currentPage != index + 1) {
      setLoading(true);
      router.push(`/blog?page=${index + 1}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex gap-2 py-7 px-5 max-w-[1400px] m-auto">
      {Array.from({ length: pages }).map((_, index) => (
        <div
          onClick={() => handlePagination(index, currentPage)}
          key={index}
          className={`py-2 px-4 rounded-md cursor-pointer ${
            currentPage == index + 1
              ? "bg-primary text-white font-medium"
              : "bg-gray-200"
          }`}
        >
          <p>{index + 1}</p>
        </div>
      ))}
    </div>
  );
}
