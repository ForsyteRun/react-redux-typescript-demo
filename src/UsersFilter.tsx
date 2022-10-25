import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./redux/redux";
import { FilterType, getPageChangeThunkCreater } from "./redux/usersReduser";

const initialValues: FilterType = {
  users: '',
  follow: null,
};

export const UsersFilter: FC = React.memo(() => {

  const pageSize = useSelector((state: AppState) => state.users.pageSize)
  const currentPageData = useSelector((state: AppState) => state.users.currentPage)
  
  const dispatch: AppDispatch= useDispatch()

  const submit = (filter: FilterType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    dispatch(getPageChangeThunkCreater(pageSize, 1, currentPageData, filter) as any) //todo: any
    setSubmitting(false)
  }
  
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
                <option value='true'>unFollow</option>
                <option value='false'>follow</option>
              </Field>
            </Form>
          )}
        </Formik>
    )
});


