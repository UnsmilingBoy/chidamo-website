export async function getPostData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blog/${id}`);
  const post = await res.json();

  return { post };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const { post } = await getPostData(id);
  return <div className="">{post.title.rendered}</div>;
}
