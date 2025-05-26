"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogHomeTile({ post }) {
  const postLink = `/blog/posts/${post.id}`;
  return (
    <div className="flex flex-row border-b gap-5 pb-5">
      <div className="h-[90px] md:h-[150px] aspect-square">
        <Link href={postLink}>
          <Image
            className="w-full h-full object-cover rounded-sm"
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt="Post Picture"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <Link href={postLink}>
          <h3 className="font-medium sm:text-lg">{post.title.rendered}</h3>
        </Link>
        <div
          className="text-sm sm:text-base text-justify line-clamp-3 md:line-clamp-4 text-[#666666]"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-1 h-5 bg-primary rounded-md"></div>
            <p
              className="text-[#2e2e2e] text-xs sm:text-sm font-medium"
              dir="rtl"
            >
              نوشته شده توسط {post?._embedded?.author[0].name} | در{" "}
              {post.date.split("T")[0].replaceAll("-", "/")}
            </p>
          </div>
          <Link className="hidden sm:block" href={postLink}>
            <p className="px-3 py-1 bg-white border border-primary text-black rounded-md">
              ادامه مطلب
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
