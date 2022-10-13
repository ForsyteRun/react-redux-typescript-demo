import { Field, FormikProps, withFormik } from 'formik';
import { FC } from 'react';
import { setImageProfileThunk } from "./redux/myProfileReducer";

export type OutherProps = {
   setImageProfileThunk: (imageUrl: string) => void
   editLogoForm: Boolean
};

type FormValuesType = {
   imageUrl: string
}

const MyProfileAvaForm: FC<OutherProps&FormikProps<FormValuesType>> = (props) => {

   return (
      <div>
         {props.editLogoForm &&     
            <form onSubmit={props.handleSubmit}>
                  <Field type="text" name="imageUrl" placeholder="Enter Url" style={{width: '100px'}}>
                  </Field>
                  <button type="submit">Submit</button>
            </form>
         }                       
      </div>
   )
}

const MyProfileAva = withFormik({
      mapPropsToValues: () => ({ imageUrl: '' }),
 
   handleSubmit: (values, { resetForm }) => {
      setImageProfileThunk(values.imageUrl)
      resetForm()
      console.log('submit MyProfileAva');
   }
 })(MyProfileAvaForm);

 export default MyProfileAva;
