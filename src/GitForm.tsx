import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { UserType } from "./Git";

const initialValues = {
  search: "" as string | null,
};

type InitialValues = typeof initialValues;

type SearchResult = {
  items: UserType[];
};

type PropsType = {
  setUsers: (el: UserType[]) => void;
};

export const GitForm: FC<PropsType> = React.memo(({ setUsers }) => {
  console.log("Form");
  const [quaryParam, setQuaryParam] = useState<string>("");

  useEffect(() => {
    if (!!quaryParam) {
      axios
        .get<SearchResult>(
          `https://api.github.com/search/users?q=${quaryParam}`
        )
        .then((res) => setUsers(res.data.items))
        .catch((res) => console.log("Error"));
      document.title = quaryParam;
    }
  }, [quaryParam]);

  const onsubmit = (values: InitialValues) => {
    if (values.search) setQuaryParam(values.search);
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
              <button type="reset" onClick={()=> setQuaryParam('forsyte')}>Reset</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});
