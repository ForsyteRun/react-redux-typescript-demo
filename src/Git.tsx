import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { GitForm } from "./GitForm";
import { GitList } from "./GitList";
import { GitUserData } from "./GitUserData";

type SearchResult = {
  items: UserType[]
}

export type UserType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
};

export const Git: FC = React.memo(() => {
  
  const [users, setUsers] = useState<Array<UserType>>([])
  const [nameColor, setNameColor] = useState<string | null>(null);

  useEffect(() => {
     axios
    .get<SearchResult>('https://api.github.com/search/users?q=forsyte')
    .then((res) => setUsers(res.data.items))
    .catch((res) => console.log("Error"));
  }, []);

  useEffect(() => {
    if (!!nameColor) document.title = nameColor;
  }, [nameColor]);

return (
    <>
    <GitForm setUsers={setUsers}/>
    <GitList users={users} setNameColor={setNameColor} nameColor={nameColor}/>
    <GitUserData nameColor={nameColor} />
    </>
  );
});

export default Git;
