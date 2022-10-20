import { Field, Form, FormikProps, FormikValues, withFormik } from 'formik';
import React, { FC, useState } from "react";
import style from './ProfileForm.module.css';
import { setProfileData } from './redux/myProfileReducer';
import { ProfileType } from "./types/types";

type PropsTypes = {
   setProfileData: (imageUrl: ProfileType) => void
   profileData: ProfileType
};

const MyProfileForm: FC<PropsTypes&FormikProps<ProfileType>>= React.memo((props) => {
   
   const [editModeForm, setEditModeForm] = useState<boolean>(false)
  
   const onSubmitForm = (values:ProfileType) => {
      setProfileData(values)
      setEditModeForm(false)
      console.log(values);
   };

   return (
      <div>       
         <Form className={style.conteiner}>  
            {Object.keys(props.values).map(el => {
               return <div>{el}:
                           {editModeForm 
                           ? <Field name={el} keys={el} className={style.inputForm}/> 
                           //@ts-ignore
                           :<span className={style.text}>{props.values[el]}</span>                           }
                        </div>                          
            })}
            {editModeForm 
            ?<button type="submit" onClick={()=>onSubmitForm}>Submit</button>
            :<button type="submit" onClick={()=>setEditModeForm(true)}>Edit info</button>}
         </Form>   
      </div>
   )
});
 
const MyProfileHOCForm = withFormik<FormikValues, ProfileType>({
   //@ts-ignore
   mapPropsToValues: (props: ProfileType) => ({  
      lookinForJob: props.lookinForJob,
      lookinForJobDiiscription: props.lookinForJobDiiscription,
      fullName: props.fullName,
      image: props.image
     }),
   handleSubmit: (values) => {
    console.log(values);
    
   }})(MyProfileForm);

export default MyProfileHOCForm;

