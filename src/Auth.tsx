import { Field, Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import s from "./Auth.module.css";
import { validateAuth } from "./formik/validateSchema";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  enterAuthThunkCreater,
  getAuthThunkCreater,
} from "./redux/authReduser";
import { AppDispatch, AppState } from "./redux/redux";

const initialValues = {
  email: "" as string | null,
  login: "" as string | number | null,
  rememberMe: false,
  captcha: "" as string | null,
};

export type FormType = typeof initialValues;

const Auth: FC = React.memo(() => {
  const isAuth = useSelector((state: AppState) => state.auth.isAuth);
  const location = useLocation()
 
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthThunkCreater() as any); //todo: any
  }, []);

  if (isAuth) return <Navigate to="/myProfile" />;

  const onSubmit = (values: FormType) => {
    dispatch(enterAuthThunkCreater(values) as any); //todo: any
  };

  return (
    <>
    <div>You comme from {location.state.from?.pathname || '/'}. Please auth</div>
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
            {errors.login && <div className={cn(s.errors)}>{errors.login}</div>}
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
    </>
  );
});

export default Auth;
