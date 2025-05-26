import BlogBanner from "./components/BlogBanner";
import BlogPostsList from "./components/BlogPostsList";
import BlogSideBarTile from "./components/BlogSideBarTile";
import { getPosts } from "@/lib/fetchPosts";

export default async function Blog({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = page || 1;

  const { posts, pages } = await getPosts(currentPage);

  return (
    <div className="flex flex-col mt-1">
      <BlogBanner posts={posts} />
      <div className="flex flex-row gap-10 py-7 px-5 max-w-[1400px] w-full m-auto">
        <BlogPostsList posts={posts} currentPage={currentPage} pages={pages} />
        <div className="hidden lg:flex flex-col w-[380px] border h-fit rounded-md gap-5 p-4">
          <h3 className="font-medium">محبوب ترین مطالب</h3>
          {posts.map((post, index) => (
            <BlogSideBarTile
              key={index}
              post={post}
              lastOne={index + 1 == posts.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
