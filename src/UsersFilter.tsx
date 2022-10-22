import { Field, Form, Formik} from "formik";
import React, { FC } from "react";

type PropsType = {
  getUsersThunkCreater: (pageSize: number, offset: number, filter: string) => void;
  pageSize: number
  currentPageData: number
};

type InitType = {
  filter: string
}

const UsersFilter: FC<PropsType> = React.memo((props) => {

  const onSubmit = (values: InitType) => {
    props.getUsersThunkCreater(props.pageSize, props.currentPageData, values.filter)
  }

  const initialValues: InitType = {
    filter: ''
  }
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize={true}
        >
          {() => (
            <Form>
              <Field name='filter'/>
            </Form>
          )}
        </Formik>
    )
});

export default UsersFilter;

