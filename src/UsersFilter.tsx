import { Field, Form, Formik, FormikValues} from "formik";
import React, { FC } from "react";

type PropsType = {
  //getUsersThunkCreater: (pageSize: number, offset: number, filter: string) => void;
  getPageChangeThunkCreater: (pageSize: number, page: number, offset: number, filter: string) => void;
  pageSize: number
  currentPageData: number
  filterUsers: string
};

type InitType = {
  filter: string
}

const UsersFilter: FC<PropsType> = React.memo(({pageSize, currentPageData, getPageChangeThunkCreater}) => {

  const submit = (filter: FormikValues, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    getPageChangeThunkCreater(pageSize, 1, currentPageData, filter.filter)
    setSubmitting(false)
  };

  const initialValues: InitType = {
    filter: ''
  };

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={submit}
        enableReinitialize={true}
        >
          {({isSubmitting, values}) => (
            <Form>
              <Field name='filter' type='text' value={values.filter}/>
              <button type='submit' disabled={isSubmitting}>Find</button>
            </Form>
          )}
        </Formik>
    )
});

export default UsersFilter;

