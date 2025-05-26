"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogSideBarTile({ post, lastOne, className }) {
  return (
    <Link
      href={`/blog/posts/${post.id}`}
      className={`flex flex-row ${!lastOne && "border-b"} gap-5 pb-5`}
    >
      <div className="w-[100px] h-[70px] aspect-video">
        <Image
          className={`w-full h-full object-cover rounded-sm`}
          src={post._embedded["wp:featuredmedia"][0].source_url}
          alt="Post Picture"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-base line-clamp-2">
          {post.title.rendered}
        </h3>
        <div
          className="text-sm text-justify text-[#666666] line-clamp-2"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>
    </Link>
  );
}
