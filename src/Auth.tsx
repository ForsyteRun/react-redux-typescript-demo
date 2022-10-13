import { Field, withFormik } from "formik";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import style from './Auth.module.css';
import { enterAuthThunkCreater } from "./redux/authReduser";

type PropsType = {
  login: string | null,
  email: string | null,
  rememberMe: boolean,
  captcha: string | null
};

type MapDTP = {
   enterAuthThunkCreater: (values: PropsType) => void
};

type OwnProps = {
  isAuth: boolean
}

const AuthForm: FC<MapDTP&PropsType&OwnProps> = (props) => {

  if (props.isAuth) return <Navigate to='/myProfile' />

  return (
    <div>
          <form  className={style.wrapper}>
            <div className={style.conteiner}>
              <Field
                name="login"
                placeholder="введите логин"
                //className={props.touched.login && props.errors.login && style.errorBorder}
              />
              <Field
                name="password"
                placeholder="введите пароль"
                //className={props.touched.password && props.errors.password && style.errorBorder}
              />
            </div>
            <div className={style.rememderBox}>
              <Field type='checkbox' name='rememberMe' id='rememberMe' />
              <span>remember me</span>
            </div>
              {/* {props.values.captcha 
              && <div>
                  <img src={props.values.captcha} style={{ width: '200px' }} />
                  <Field name='captchaResponse'/> 
                 </div>}                     */} 
            {/* //<button disabled={props.isSubmitting} type="submit">Submit</button> */}
          </form>
 
    </div>
  )
}

const Auth = withFormik({
  mapPropsToValues: () => ({ 
    login: '',
    email:'',
    rememberMe: false,
    captcha: '',
 }),

  handleSubmit: (values, {setSubmitting}) => {
    enterAuthThunkCreater(values, setSubmitting)
    
  },

})(AuthForm);

export default Auth;
