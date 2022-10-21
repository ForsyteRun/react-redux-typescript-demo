import { Field, Form, FormikProps, FormikValues, withFormik } from 'formik';
import React, { FC, useState } from "react";
import style from './ProfileForm.module.css';
import { setProfileData } from './redux/myProfileReducer';
import { ProfileType } from "./types/types";

type PropsTypes = {
   setProfileData: (imageUrl: ProfileType) => void
   lookinForJob: string | null
   lookinForJobDiiscription: string | null
   fullName: string | null
};

const MyProfileForm: FC<PropsTypes&FormikProps<PropsTypes>>= React.memo((props) => {
   const [editModeForm, setEditModeForm] = useState<boolean>(false)
   console.log(props.values);
   
   // const onSubmitForm = (values:ProfileType) => {
   //    props.setProfileData(values)
   //    setEditModeForm(false)
   //    console.log(values);
   // };

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
   handleSubmit: (values, props) => {
      props.props.setProfileData(values)
      props.resetForm()
   }, 
   enableReinitialize: true,
})(MyProfileForm);

export default MyProfileHOCForm;

