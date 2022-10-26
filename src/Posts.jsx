import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Posts.module.css";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data));
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <div className={s.conteiner}>
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <li>{post.title}</li>
          </Link>
        ))}
      </div>
    </>
  );
};
