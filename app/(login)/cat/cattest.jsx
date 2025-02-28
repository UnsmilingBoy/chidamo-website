"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function ProductFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.checked) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={searchParams.get("available") === "true"}
        onChange={handleFilterChange}
      />
      <span>Show only available products</span>
    </label>
  );
}
