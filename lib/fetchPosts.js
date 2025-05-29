export async function getPosts(page) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog?page=${page}`);
  const results = await res.json();
  const posts = results.postsList;
  const pages = results.totalPages;

  return { posts, pages };
}

export async function searchForPosts({ query, params }) {
  let page = 1;
  const sParams = await params;
  if (sParams.page) {
    page = sParams.page;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog?page=${page}&search=${query}`);
  const results = await res.json();
  const posts = results.postsList;
  const pages = results.totalPages;

  return { posts, pages };
}
