import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import editLogo from './img/edit.png';
import photo from './img/smile.jpg';
import s from './MyProfile.module.css';
import { MyProfileAvaForm } from "./MyProfileAvaForm";
import { MyProfileDataForm } from "./MyProfileDataForm";
import { AppState } from "./redux/redux";

export const MyProfile: FC = React.memo(() => {

   const avatar = useSelector((state:AppState) => state.myProfile.avatar)
   
   const [editLogoForm, setEditLogoForm] = useState<boolean>(false);

   useEffect(() => {
      setEditLogoForm(false)
   }, [avatar])
    
   return (
      <div className={s.conteiner}>
         <div className={s.logoConteiner}>
            <img src={avatar
               ? avatar
               : photo} alt='ava'/>
            <span className={s.editLogo} onClick={() => setEditLogoForm(!editLogoForm)} >
               <img src={editLogo} alt='noAva'/>
            </span>
            <MyProfileAvaForm editLogoForm={editLogoForm}/>
         </div>
         <div className={s.rightBlock}>
            <MyProfileDataForm /> 
         </div>
      </div>
   )
});