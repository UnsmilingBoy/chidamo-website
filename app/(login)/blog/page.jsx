import BlogBanner from "./components/BlogBanner";
import BlogPostsList from "./components/BlogPostsList";
import BlogSideBarTile from "./components/BlogSideBarTile";
import { getPosts } from "@/lib/fetchPosts";

export default async function Blog({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = page || 1;

  const [mainPosts, sidebarData] = await Promise.all([
    getPosts(currentPage),
    getPosts(1),
  ]);

  const { posts, pages } = mainPosts;
  const { posts: sidebarPosts } = sidebarData;

  return (
    <div className="flex flex-col mt-1">
      <BlogBanner posts={posts} />
      <div className="flex flex-row gap-10 py-7 px-5 max-w-[1400px] w-full m-auto">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="font-medium text-xl py-3">جدیدترین مطالب</h1>
          <BlogPostsList
            posts={posts}
            currentPage={currentPage}
            pages={pages}
          />
        </div>
        <div className="hidden lg:flex flex-col w-[380px] border h-fit rounded-md gap-5 p-4">
          <h3 className="font-medium">محبوب ترین مطالب</h3>
          {sidebarPosts.map((post, index) => (
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
