import React, { FC } from "react";
import { UserType } from "./Git";
import s from "./Git.module.css";

type SearchResult = {
  users: UserType[]
  setNameColor: (el: string) => void
  nameColor: string | null
};

export const GitList: FC<SearchResult> = React.memo(({nameColor, users, setNameColor}) => {
  console.log('List');

  return (
    <>
      <div className={s.listConteiner}>
        <ul>
          {users.map((el: UserType) => (
            <li
              key={el.id}
              className={nameColor === el.login ? s.selected : ""}
              onClick={() => {
              setNameColor(el.login);
              }}
            >
            {el.login}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});