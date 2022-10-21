import React, { FC, useEffect, useState } from "react";
import editLogo from './img/edit.png';
import photo from './img/smile.jpg';
import s from './MyProfile.module.css';
import MyProfileAvaForm from "./MyProfileAvaForm";
import Preloader from "./Preloader";
import MyProfileHOCForm from "./MyProfileForm";
import { ProfileType } from "./types/types";

type PropsType = {
   avatar: string | null
   isLoading: boolean
   setImageProfile: (imageUrl: any) => void
   setProfileData: (imageUrl: ProfileType) => void
   profileData: ProfileType
};

const MyProfile: FC<PropsType> = React.memo((props) => {

   const{avatar, isLoading, setImageProfile, profileData, setProfileData}=props
   const [editLogoForm, setEditLogoForm] = useState<boolean>(false);

   useEffect(() => {
      setEditLogoForm(false)
   }, [avatar])

   if (isLoading) {
      return <Preloader />
   }
    
   return (
      <div className={s.conteiner}>
         <div className={s.logoConteiner}>
            <img src={avatar
               ? avatar
               : photo} alt='ava'/>
            <span className={s.editLogo} onClick={() => setEditLogoForm(!editLogoForm)} >
               <img src={editLogo} alt='noAva'/>
            </span>
            <MyProfileAvaForm setImageProfile={setImageProfile} editLogoForm={editLogoForm} avatar={avatar}/>
         </div>
         <div className={s.rightBlock}>
            <MyProfileHOCForm setProfileData={setProfileData} fullName={profileData.fullName}
            lookinForJobDiiscription={profileData.lookinForJobDiiscription} lookinForJob={profileData.lookinForJob}/> 
         </div>
      </div>
   )
});

export default MyProfile;