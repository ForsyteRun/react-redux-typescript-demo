import { Field, Form, FormikProps, FormikValues, withFormik } from 'formik';
import React, { FC, useState } from "react";
import { validateProfileData } from './formik/validateSchema';
import s from './ProfileForm.module.css';
import { ProfileType } from "./types/types";
import cn from 'classnames';

type PropsTypes = {
   setProfileData: (imageUrl: ProfileType) => void
   lookinForJob: string | null
   lookinForJobDiiscription: string | null
   fullName: string | null
};

const MyProfileForm: FC<PropsTypes&FormikProps<PropsTypes>>= React.memo((props) => {
   const{values, errors} = props;
   const [editModeForm, setEditModeForm] = useState<boolean>(false)

   console.log(props);
   
   return (
      <div>       
         <Form className={s.conteiner}>  
            {Object.keys(values).map(el => {
               return <div>{el}:
                           {editModeForm 
                           ? <Field name={el} keys={el} className={s.inputForm}/> 
                           //@ts-ignore
                           :<span className={s.text}>{values[el]}</span>}
                           { //@ts-ignore
                           errors[el] && <div className={cn(s.error)}>{errors[el]}</div>}
                        </div>                          
            })}
            {editModeForm 
            ?<button type="button" onClick={()=>setEditModeForm(false)}>Submit</button>
            :<button type='submit' onClick={()=>setEditModeForm(true) }>Edit info</button>}
         </Form>   
      </div>
   )
});
 
const MyProfileHOCForm = withFormik<FormikValues, ProfileType>({
   mapPropsToValues: (props: any) => ({  
      lookinForJob: props.lookinForJob,
      lookinForJobDiiscription:props.lookinForJobDiiscription,
      fullName: props.fullName,    
     }),
   validationSchema: validateProfileData,
   handleSubmit: (values, props) => {
      props.props.setProfileData(values)
      props.resetForm()
   }, 
   enableReinitialize: true,
})(MyProfileForm);

export default MyProfileHOCForm;

