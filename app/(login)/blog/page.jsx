import "./style.css";
import BlogBanner from "./components/BlogBanner";
import BlogPostsList from "./components/BlogPostsList";

export async function getPosts(page) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog?page=${page}`);
  const results = await res.json();
  const posts = results.postsList;
  const pages = results.totalPages;

  return { posts, pages };
}

export default async function Blog({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = page || 1;

  const { posts, pages } = await getPosts(currentPage);

  return (
    <div className="flex flex-col mt-1">
      <BlogBanner posts={posts} />
      <BlogPostsList posts={posts} currentPage={currentPage} pages={pages} />
    </div>
  );
}
