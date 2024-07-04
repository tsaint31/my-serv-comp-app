import { format } from "date-fns";

function delayedFetch(url: string, options: any, delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url, options)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    }, delay);
  });
}

async function fetchComments(id: string) {
  const res: any = await delayedFetch(
    "https://jsonplaceholder.typicode.com/comments",
    {},
    3000
  );

  if (!res.ok) {
    throw new Error("Error occurred when fetching comments");
  }
  return res.json();
}

export async function CommentsServer({ params }: { params: any }) {
  const commentsPromise = fetchComments(params.slug);
  const comments = await commentsPromise;
  return (
    <>
      <ul>
        {comments.map((item: any) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>
            <p>{item.body}</p>
            <p>{format(new Date(2014, 1, 11), "yyyy-MM-dd")}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
