import { CommentsServer } from "@/app/server/CommentsServer";
import { CommentsClient } from "../../../client/CommentsClients";
import { Suspense } from "react";

async function fetchBlogPost(id: string) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Error occurred when fetching posts");
  }
  const posts = await res.json();

  for (let post of posts) {
    if (post.id == id) {
      return post;
    }
  }
}

export async function BlogPost({ promise }: { promise: any }) {
  const post = await promise;
  return (
    <>
      <h1 className="text-2xl font-bold text-center">{post.title}</h1>
      <p className="text-lg">{post.body}</p>
    </>
  );
}

export default async function Post({ params }: { params: any }) {
  const postPromise = fetchBlogPost(params.slug);
  return (
    <div className="flex flex-col max-w-7xl p-10 space-y-10">
      <BlogPost promise={postPromise} />
      <div className="flex flex-row">
        <div className="basis-1/2">
          <h2 style={{ color: "red" }} className="text-xl">
            Comments from Client Components
          </h2>
          <CommentsClient id={params.slug} />
        </div>
        <div className="basis-1/2">
          <h2 style={{ color: "blue" }} className="text-xl">
            Comments from React Server Components
          </h2>
          <Suspense fallback={<div>Loading Comments..</div>}>
            <CommentsServer params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
