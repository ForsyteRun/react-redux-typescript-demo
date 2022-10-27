import { useState } from "react";

export const PostsForm = ({ setSearchParam, latest, postQuary }: any) => {
  const [search, setSearch] = useState(postQuary);
  const [from50, setfrom50] = useState(latest);

  const submit = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const text = form.name.value;
    const isCheck = String(form.checkbox.checked);

    const params: ParamsType = {};

    type ParamsType = {
      articles?: string;
      isCheck?: string;
    };

    if (text.length) params.articles = text;
    if (isCheck === "true") params.isCheck = "true";

    setSearchParam(params);
  };

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          name="name"
          placeholder="enter part of articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label>
          Only last 50
          <input
            type="checkbox"
            name="checkbox"
            checked={from50}
            onChange={(e) => setfrom50(e.target.checked)}
          ></input>
        </label>
        <button type="submit">Find</button>
      </form>
    </>
  );
};
