import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Git.module.css";

const initialValues = {
  search: "" as string | null,
};

type InitialValues = typeof initialValues

type SearchResult = {
  items: UserType[]
}

type UserType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
};

const Git: FC = React.memo(() => {
  const [nameColor, setNameColor] = useState<string | null>(null);
  const [users, setUsers] = useState<Array<UserType>>([])
  const [quaryParam, setQuaryParam] = useState<string>('')
  const [userData, setUserData] = useState<UserType | null>(null)

  const fetchData = (search: string) => {
    axios
    .get<SearchResult>(`https://api.github.com/search/users?q=${search}`)
    .then((res) => setUsers(res.data.items))
    .catch((res) => console.log("Error"));
  };

  useEffect(() => {
    if (!!nameColor) document.title = nameColor;
  }, [nameColor]);

  useEffect(() => {
    if(!!nameColor){
      axios
      .get<UserType>(`https://api.github.com/users/${nameColor}`)
      .then((res) => setUserData(res.data))
      .catch((res) => console.log("Error"));
    }
  }, [nameColor])

  useEffect(() => {
    fetchData('forsyte')
  }, []);

  useEffect(() => {
    if(!!quaryParam){
    fetchData(quaryParam)
    document.title = quaryParam
    }
  }, [quaryParam]);

  const onsubmit = (values: InitialValues) => {
    if(values.search) setQuaryParam(values.search)
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onsubmit(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form name="form" id="form">
              <label htmlFor="search">search</label>
              <Field type="text" name="search" />
              <button type="submit">Find</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={s.listConteiner}>
        <ul>
          {users.map((el) => (
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
      <div>
          {userData && <div>
            {userData.login}
            <div>
               <img src={userData.avatar_url} alt='logo'/>
            </div>
            </div>}
      </div>
    </>
  );
});

export default Git;
