import { Field, Form, Formik } from "formik";
import QueryString from "qs";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, AppState } from "./redux/redux";
import { FilterType, getPageChangeThunkCreater } from "./redux/usersReduser";

export const UsersFilter: FC = React.memo(() => {
  console.log('filter');
  
  const pageSize = useSelector((state: AppState) => state.users.pageSize)
  const currentPageData = useSelector((state: AppState) => state.users.currentPage)
  
  const dispatch: AppDispatch= useDispatch()

  const [search, setSearch] = useSearchParams() as any
  const location = useLocation()
 
  const postQuary = search.get('users') || ''
  
  const submit = (filter: FilterType) => {
    setSearch({users: filter.users})
    dispatch(getPageChangeThunkCreater(pageSize, 1, currentPageData, filter) as any) //todo: any
  }

  useEffect(() => {
    console.log('location render');
    
    const usersParams = QueryString.parse(location.search.substring(1));
    const params: any = {}
    if(!!usersParams.users) params.users = usersParams.users
    dispatch(getPageChangeThunkCreater(pageSize, 1, currentPageData, params) as any) //todo: any
  }, [location.search])

  
  
  const initialValues: FilterType = {
    users: postQuary,
    follow: null,
    last5: false
  };

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


