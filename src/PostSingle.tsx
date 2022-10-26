import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PostsSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => setPost(res.data));
  }, [id]);

  return (
    <div>
      <h1>PostSingle</h1>
      <button onClick={() => navigate(-1)}>Go back</button>
      <Link to = {`/posts/${id}/edit`}>Edit this post</Link>
      {post && (
        <>
          <h1>{post.title}</h1>
          <div>{post.body}</div>
        </>
      )}
    </div>
  );
};
