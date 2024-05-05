import PostId from "@/components/idPost/PostID";

//giaoluu/[id]/page.jsx
export async function generateStaticParams() {
  const posts = await fetch("http://45.118.144.160:8080/posts").then((res) =>
    res.json()
  );
  return posts.map((post) => ({
    id: post.url,
  }));
}
async function getData(id) {
  const res = await fetch(`http://45.118.144.160:8080/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}
async function getDataComments(id) {
  const res = await fetch(`http://45.118.144.160:8080/comments/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}
async function GiaoluuId({ params }) {
  const datas = await getData(params.id);
  const datacomment = await getDataComments(datas.id);

  return (
    <div>
      <PostId dataID={{ datas, datacomment }} />
    </div>
  );
}

export default GiaoluuId;
