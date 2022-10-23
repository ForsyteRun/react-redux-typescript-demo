import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { FilterType } from "./redux/usersReduser";

type PropsType = {
  getPageChangeThunkCreater: (pageSize: number, page: number, offset: number, filter: FilterType) => void;
  pageSize: number
  currentPageData: number
  filterUsers: FilterType
};

const UsersFilter: FC<PropsType> = React.memo(({pageSize, currentPageData, getPageChangeThunkCreater}) => {

  const submit = (filter: FilterType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    getPageChangeThunkCreater(pageSize, 1, currentPageData, filter)
    setSubmitting(false)
    console.log(filter);
  };
//todo: null, true, false response in string
  const initialValues: FilterType = {
    users: '',
    follow: null
  };

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={submit}
        enableReinitialize={true}
        >
          {({isSubmitting, values}) => (
            <Form>
              <Field name='users' type='text' value={values.users}/>
              <button type='submit' disabled={isSubmitting}>Find</button>
              <Field  name="follow" as="select" >
                <option value='null'>All</option>
                <option value='true'>UnFollow</option>
                <option value='false'>Follow</option>
              </Field>
            </Form>
          )}
        </Formik>
    )
});

export default UsersFilter;

