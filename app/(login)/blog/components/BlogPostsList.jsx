"use client";

import { useSearchParams } from "next/navigation";
import BlogHomeTile from "./BlogHomeTile";
import BlogPagination from "./BlogPagination";
import BlogSideBarTile from "./BlogSideBarTile";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/utils/loadingSpinner";

export default function BlogPostsList({ posts, currentPage, pages }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-10 py-7 px-5 max-w-[1400px] w-full m-auto">
        {loading ? (
          <div className="h-[50vh] flex-1 flex justify-center items-center">
            <LoadingSpinner color="primary" size={40} border={3} />
          </div>
        ) : (
          <div className="flex flex-col flex-1 gap-5">
            <h1 className="font-medium text-xl py-3">جدیدترین مطالب</h1>
            <div className="flex flex-col gap-5">
              {posts.map((post, index) => (
                <BlogHomeTile key={index} post={post} />
              ))}
            </div>
          </div>
        )}
        <div className="hidden lg:flex flex-col w-[400px] border rounded-md gap-5 p-4">
          <h3 className="font-medium">محبوب ترین مطالب</h3>
          {posts.map((post, index) => (
            <BlogSideBarTile key={index} post={post} />
          ))}
        </div>
      </div>
      <BlogPagination
        currentPage={currentPage}
        pages={pages}
        setLoading={setLoading}
      />
    </div>
  );
}
