export async function getPosts(page) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog?page=${page}`);
  const results = await res.json();
  const posts = results.postsList;
  const pages = results.totalPages;

  return { posts, pages };
}
