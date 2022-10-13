import { Field, FormikProps, withFormik } from 'formik';
import { FC, useState } from "react";
import style from './ProfileForm.module.css';
import { upLoadProfileData } from './redux/myProfileReducer';
import { ProfileType } from "./types/types";

type OutherProps = {
   upLoadProfileData: (imageUrl: string) => void
};

type FormValuesType = {
   profileData: ProfileType
};

const ProfileForm: FC<OutherProps&FormikProps<FormValuesType>>= (props) => {
   
   const [editMode, setEditMode] = useState(false)

   return (
      <div>       
         <form onSubmit={props.handleSubmit} className={style.conteiner}>  
            {Object.keys(props.values.profileData).map(el => {
               return <div>{el}:
                           {editMode 
                           ? <Field name={el} keys={el} className={style.inputForm}/> 
                           //@ts-ignore
                           : <span className={style.text}>{props.values[el]}</span>} 
                        </div>
            })}
         
            <button type="submit" onClick={() => setEditMode(!editMode)}>Submit</button>
         </form>   
      </div>
   )
};


 
const ProfileHOCForm = withFormik({
   mapPropsToValues: () => ({  
      lookinForJob: '',
      lookinForJobDiiscription: '',
      fullName: '',
      id: 1,
      image: ''}),
   handleSubmit: (values: ProfileType) => {
      upLoadProfileData(values)
   }})(ProfileForm);

export default ProfileHOCForm;

