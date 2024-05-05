export async function generateStaticParams() {
  const posts = await fetch("http://45.118.144.160:8080/posts").then((res) =>
    res.json()
  );

  return posts.map((post) => ({
    id: post.id,
  }));
}
