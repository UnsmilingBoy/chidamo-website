import "./style.css";
import { getPosts } from "@/lib/fetchPosts";
import BlogSideBarTile from "../../components/BlogSideBarTile";
import Image from "next/image";

export async function getPostData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog/${id}`);
  const post = await res.json();

  return { post };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const { post } = await getPostData(id);
  const { posts, pages } = await getPosts(1);
  return (
    <div className="flex flex-row max-w-[1400px] w-full gap-10 py-7 px-5 m-auto">
      <div className="flex-1 w-full">
        <Image
          className="w-full max-h-[250px] object-cover rounded-md"
          src={post._embedded["wp:featuredmedia"][0].source_url}
          width={300}
          height={300}
          alt="Post picture"
        />
        <div className="flex flex-col gap-2 py-5">
          <h3 className="font-medium md:text-2xl line-clamp-2">
            {post.title.rendered}
          </h3>
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
        </div>
        <div
          className="text-justify text-[#333333] custom-content-style w-full overflow-hidden"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
      <div className="hidden lg:flex flex-col w-[380px] border h-fit rounded-md gap-5 p-4">
        <h3 className="font-medium">محبوب ترین مطالب</h3>
        {posts.map((item, index) => (
          <BlogSideBarTile
            key={index}
            post={item}
            lastOne={index + 1 == posts.length}
          />
        ))}
      </div>
    </div>
  );
}
