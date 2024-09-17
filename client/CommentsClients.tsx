"use client";

import { useEffect, useState } from "react";
// import { format } from "date-fns";

function delayedFetch(url: string, options: any, delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url, options)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    }, delay);
  });
}

export function CommentsClient({ id }: { id: string }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    delayedFetch("https://jsonplaceholder.typicode.com/comments", {}, 3000)
      .then((res: any) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul>
        {data?.map((item: any) => (
          <li key={item.id}>
            <p>Name : {item.email}</p>
            <p>Comment : {item.body}</p>
            {/* <p>Date : {format(new Date(2014, 1, 11), "yyyy-MM-dd")}</p> */}
            <div>______</div>
          </li>
        ))}
      </ul>
    </>
  );
}
