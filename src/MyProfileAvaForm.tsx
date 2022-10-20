import { Field, Form, FormikProps, FormikValues, withFormik } from 'formik';
import React, { FC } from 'react';
import { setImageProfileThunk } from "./redux/myProfileReducer";
import s from './MyProfileAvaForm.module.css'

type FormValuesType = {
   setImageProfileThunk: (imageUrl: string) => void
   editLogoForm: Boolean
}

const MyProfileAvaForm: FC<FormikProps<FormValuesType>&FormValuesType> =React.memo((props) => {

   return (
      <div>
         {props.editLogoForm &&     
            <Form>
                  <Field type="text" name="imageUrl" placeholder="Enter Url" className={s.block}>
                  </Field>
                  <button type="submit">Submit</button>
            </Form>
         }                       
      </div>
   )
});

const MyProfileAva = withFormik<FormValuesType, FormikValues>({
      mapPropsToValues: (props) => ({
         editLogoForm: props.editLogoForm
       }),
 
   handleSubmit: (values, { resetForm }) => {
      setImageProfileThunk(values.imageUrl)
      resetForm()
      console.log('submit MyProfileAva');
   }, 
   enableReinitialize: true
 })(MyProfileAvaForm);

 export default MyProfileAva;
