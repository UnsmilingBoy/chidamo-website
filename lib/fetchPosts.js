export async function getPosts({ query, params }) {
  const { page } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog?page=${page}`);
  const results = await res.json();
  const posts = results.postsList;
  const pages = results.totalPages;

  return { posts, pages };
}
