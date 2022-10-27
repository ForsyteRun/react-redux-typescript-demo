import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { boolean } from "yup/lib/locale";
import { AppDispatch, AppState } from "./redux/redux";
import { FilterType, getPageChangeThunkCreater } from "./redux/usersReduser";

const initialValues: FilterType = {
  users: '',
  follow: null,
  last5: false
};

export const UsersFilter: FC = React.memo(() => {

  const pageSize = useSelector((state: AppState) => state.users.pageSize)
  const currentPageData = useSelector((state: AppState) => state.users.currentPage)
  
  const dispatch: AppDispatch= useDispatch()

  const [searchUsers, setSearchUsers] = useSearchParams()
  const [searchFollow, setSearchFollow] = useSearchParams()
  
  // const usersUrl = searchUsers.get('users')
  // const followUrl = searchFollow.get('follow')


  const submit = (filter: FilterType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    dispatch(getPageChangeThunkCreater(pageSize, 1, currentPageData, filter) as any) //todo: any
    setSubmitting(false)
    setSearchFollow({follow: filter.follow} as any)
    setSearchUsers({users: filter.users})
    console.log(filter);
    
  }
  
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={submit}
        enableReinitialize={true}
        >
          {({isSubmitting, values}) => (
            <Form>
              <label htmlFor='last5'>
              Show last 5
              <Field type='checkbox' name='last5' />
              </label> 
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


