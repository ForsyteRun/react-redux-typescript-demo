import { Field, Form, Formik} from "formik";
import React, { FC } from "react";
import s from './Register.module.css';

const initialValues = {
  login: "" as  string | null,
  password: "" as  string | null,
};

const Register: FC = React.memo(() => {  
  return (
    <Formik 
    initialValues={initialValues} 
    onSubmit={(values)=> console.log(values)} 
    enableReinitialize={true}>
      {({touched, errors, isValid}) => (
        <Form name="form" id="form">
          <div>
            <label htmlFor="login">login</label>
            <Field
              type="text"
              name="login"
              className={touched.login && s.error}
            />
            {touched.login && (
              <div className={s.errors}>{errors.login}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">password</label>
            <Field
              name="password"
              className={touched.password && s.error}
            />
            {touched.password && (
              <div className={s.errors}>{errors.password}</div>
            )}
          </div>
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
});

export default Register;
