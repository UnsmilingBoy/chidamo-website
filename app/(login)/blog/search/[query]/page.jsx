import { getPosts, searchForPosts } from "@/lib/fetchPosts";
import BlogPostsList from "../../components/BlogPostsList";
import BlogSideBarTile from "../../components/BlogSideBarTile";

export default async function SearchResult({ params, searchParams }) {
  const { query } = await params;
  const { page } = await searchParams;

  const [searchResult, sidebarData] = await Promise.all([
    searchForPosts({ query: query, params: searchParams }),
    getPosts(1),
  ]);

  const { posts, pages } = searchResult;
  const { posts: sidebarPosts } = sidebarData;

  return (
    <div className="flex flex-row gap-10 py-7 px-5 max-w-[1400px] w-full m-auto">
      <div className="flex-1 flex flex-col gap-5">
        <h1 className="font-medium text-xl py-3">نتایج جستجو:</h1>
        <BlogPostsList currentPage={"1"} pages={pages} posts={posts} />
      </div>
      <div className="hidden lg:flex flex-col w-[380px] border h-fit rounded-md gap-5 p-4">
        <h3 className="font-medium">محبوب ترین مطالب</h3>
        {sidebarPosts.map((post, index) => (
          <BlogSideBarTile
            key={index}
            post={post}
            lastOne={index + 1 == sidebarPosts.length}
          />
        ))}
      </div>
    </div>
  );
}
