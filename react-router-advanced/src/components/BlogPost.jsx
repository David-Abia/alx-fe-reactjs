import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return <h2>Blog Post Page: Post ID {id}</h2>;
}
