import React, { FC, useEffect, useState } from "react";
import editLogo from './img/edit.png';
import photo from './img/smile.jpg';
import s from './MyProfile.module.css';
import MyProfileAvaForm from "./MyProfileAvaForm";
import Preloader from "./Preloader";
import MyProfileHOCForm from "./MyProfileForm";
import { ProfileType } from "./types/types";

type PropsType = {
   imageProfile: string | null
   isLoading: boolean
   setImageProfile: (imageUrl: any) => void
   setProfileData: (imageUrl: ProfileType) => void
   profileData: ProfileType
};

const MyProfile: FC<PropsType> = React.memo((props) => {
   const{imageProfile, isLoading, setImageProfile, profileData, setProfileData}=props
   const [editLogoForm, setEditLogoForm] = useState<boolean>(false);

   useEffect(() => {
      setEditLogoForm(false)
   }, [imageProfile])

   if (isLoading) {
      return <Preloader />
   }
   return (
      <div className={s.conteiner}>
         <div className={s.logoConteiner}>
            <img src={imageProfile
               ? imageProfile
               : photo} alt='ava'/>
            <span className={s.editLogo} onClick={() => setEditLogoForm(!editLogoForm)} >
               <img src={editLogo} alt='noAva'/>
            </span>
            <MyProfileAvaForm setImageProfile={setImageProfile} editLogoForm={editLogoForm} imageUrl={profileData.image}/>
         </div>
         <div className={s.rightBlock}>
            <MyProfileHOCForm setProfileData={setProfileData} profileData={profileData}/> 
         </div>
      </div>
   )
});

export default MyProfile;