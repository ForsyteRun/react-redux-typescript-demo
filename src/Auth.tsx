import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import s from "./Auth.module.css";
import { validateAuth } from "./formik/validateSchema";
import cn from "classnames";

export type PropsType = {
  login: string | number | null;
  email: string | null;
  rememberMe: boolean;
  captcha: string | null;
};

type DispatchType = {
  isAuth: boolean;
  enterAuthThunkCreater: (values: PropsType) => void;
};

const Auth: FC<PropsType & DispatchType> = React.memo((props) => {
 
  if (props.isAuth) return <Navigate to='/myProfile' />; 
 
  const initialValues: PropsType = {
    email: '',
    login: '',
    rememberMe: false,
    captcha: '',
  };

  const onSubmit = (values: PropsType) => {
    props.enterAuthThunkCreater(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validateAuth}
      enableReinitialize={true}
    >
      {({ errors, values }) => (
        <Form className={s.wrapper}>
          <div className={s.conteiner}>
            <Field name="email" placeholder="введите логин" />
            {errors.email && <div className={cn(s.errors)}>{errors.email}</div>}
            <Field name="login" placeholder="введите login" />
            {errors.login && (
              <div className={cn(s.errors)}>{errors.login}</div>
            )}
          </div>
          <div className={s.rememderBox}>
            <Field type="checkbox" name="rememberMe" id="rememberMe" />
            <span>remember me</span>
          </div>
          {values.captcha && (
            <div>
              <img src={values.captcha} alt="captcha" />
              <Field name="captchaResponse" />
            </div>
          )}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
});

export default Auth;
