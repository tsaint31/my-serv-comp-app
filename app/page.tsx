import Link from "next/link";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function fetchBlogPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Error occurred when fetching posts");
  }
  return res.json();
}

export default async function Home() {
  const posts = await fetchBlogPosts();

  return (
    <div className="flex flex-col items-center w-full h-full p-10 ">
      <div className="text-2xl font-bold">Blog Posts</div>
      <div className="my-10 border-2 w-full"></div>
      <ul className="space-y-10">
        {posts.map((post: any) => (
          <li key={post.id}>
            <h1 className="text-xl font-bold hover:text-indigo-500 hover:underline">
              <Link href={"/posts/" + post.id}>{post.title}</Link>
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
}
