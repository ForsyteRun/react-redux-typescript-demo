import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { validateProfileData } from './formik/validateSchema';
import s from './ProfileForm.module.css';
import { getProfileData, setProfileData } from './redux/myProfileReducer';
import { AppDispatch, AppState } from './redux/redux';

const initialValue = {
   lookinForJob: '' as string | null,
   lookinForJobDiiscription:'' as string | null,
   fullName: '' as string | null,
};

type InitType = typeof initialValue;

export const MyProfileDataForm: FC = React.memo(() => {

   const profileData = useSelector((state: AppState) => state.myProfile.profileInfo)
   const dispatch: AppDispatch = useDispatch()
   console.log(profileData)

   useEffect(() => {
      debugger
      dispatch(getProfileData() as any) //todo: any
   }, [dispatch])
   
   const [editModeForm, setEditModeForm] = useState<boolean>(false)
   
   const onsubmit = (values: InitType) => {
      dispatch(setProfileData(values) as any) //todo: any
      console.log(values);
      
   };

   return (
         <Formik
         initialValues={initialValue}
         onSubmit={(value) => onsubmit(value)}
         validationSchema={validateProfileData}
         enableReinitialize={true}
         >

            {({errors}) => (
               <Form className={s.conteiner}>  
                  {Object.keys(profileData).map(el => {
                     return <div>{el}:
                                 {editModeForm 
                                 ? <Field name={el} keys={el} className={s.inputForm}/> 
                                 //@ts-ignore
                                 :<span className={s.text}>{profileData[el]}</span>}
                                 { //@ts-ignore
                                 errors[el] && <div className={cn(s.error)}>{errors[el]}</div>}
                              </div>                          
                  })}
                  {editModeForm 
                  ?<button type="button" onClick={()=>setEditModeForm(false)}>Submit</button>
                  :<button type='submit' onClick={()=>setEditModeForm(true) }>Edit info</button>}
               </Form>
            )}
   
         </Formik>
   )
});
