import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import s from "./Posts.module.css";
import { PostsForm } from "./PostsForm";
import { AppState } from "./redux/redux";

type PostType = {
  id: number;
  title: string;
  body: string;
};
export const Posts = () => {
  const last5 = useSelector((state: AppState) => state.users.filter.last5);
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data));
  }, [last5]);

  const postQuary: any = searchParam.get("articles") || "";

  const latest = searchParam.has("isCheck");
  const isLatest = latest ? 50 : 1;
  console.log(isLatest);

  return (
    <>
      <h1>Posts</h1>
      <PostsForm
        setSearchParam={setSearchParam}
        postQuary={postQuary}
        latest={latest}
      />
      <div className={s.conteiner}>
        {posts
          .filter(
            (post) => post.title.includes(postQuary) && post.id >= isLatest
          )
          .map((post: PostType) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <li>{post.title}</li>
            </Link>
          ))}
      </div>
    </>
  );
};
