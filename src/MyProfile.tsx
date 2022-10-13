import cn from 'classnames';
import { FC, useEffect, useState } from "react";
import editLogo from './img/edit.png';
import photo from './img/smile.jpg';
import style from './MyProfile.module.css';
import MyProfileAvaForm from "./MyProfileAvaForm";
import Preloader from "./Preloader";
import ProfileHOCForm from "./ProfileForm";
import { ProfileType } from "./types/types";

type PropsType = {
   imageProfile: string | null
   isLoading: boolean
   setImageProfileThunk: (imageUrl: any) => void
   editLogoForm: Boolean
   isAuth: boolean
   profileData: ProfileType
   getImageProfile: () => void
   getProfileData: () => void
   getHeaderThunkCreater: () => void

};


const MyProfile: FC<PropsType> = (props) => {

  const [editLogoForm, setEditLogoForm] = useState(false);

   useEffect(() => {
      setEditLogoForm(false)
   }, [props.imageProfile])

   if (props.isLoading) {
      return <Preloader />
   }
   return (
      <div className={cn(style.conteiner)}>
         <div className={cn(style.logoConteiner)}>
            <img src={props.imageProfile
               ? props.imageProfile
               : photo} alt='ava' style={{width: '200px'}}/>
            <span className={cn(style.editLogo)} onClick={() => setEditLogoForm(!editLogoForm)} >
               <img src={editLogo} alt='noAva'/>
            </span>
            <MyProfileAvaForm {...props}/>
         </div>
         <div className={cn(style.rightBlock)}>
            <ProfileHOCForm {...props}/>
         </div>
      </div>
   )
}

export default MyProfile;