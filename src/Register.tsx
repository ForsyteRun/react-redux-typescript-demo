import { Form, withFormik } from "formik";
import { FC } from 'react';

type PropsType = {
   login: string | null 
   password: string | null
}
const RegisterForm: FC<PropsType> = () => {
   return(
      <Form name = 'form' id ='form'>
         {/* <div>
            <label htmlFor ='login'>login</label>
            <Field type ='text' name ='login' className={touched.login && style.error}/>
            {touched.login && <div className ={style.errors}>{errors.login}</div>}
         </div>
         <div>
            <label htmlFor='password'>password</label>
            <Field name='password' className={touched.password  && style.error}/>
            {touched.password && <div className ={style.errors}>{errors.password}</div>}
         </div>
         <button type='submit' disabled={!isValid}>Submit</button> */}
      </Form>
   )
};

const Register = withFormik({
   mapPropsToValues: () => ({  
      login: '' , 
      password: ''  }),
 
   handleSubmit: (values) => {
    
   },
 

 })(RegisterForm);

export default Register;


