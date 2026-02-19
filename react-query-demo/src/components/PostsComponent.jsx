import { useQuery } from "react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery("posts", fetchPosts, {
    staleTime: 1000 * 60 * 2 // cache lasts 2 minutes
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={refetch}>
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      {data.slice(0, 10).map(post => (
        <div key={post.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
