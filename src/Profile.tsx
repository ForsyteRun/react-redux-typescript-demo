import { FC } from "react";
import Preloader from "./Preloader";
import { UserData } from "./types/types";

type PropsType = {
  userProfile: UserData
};

const Profile: FC<PropsType> = ({userProfile}) => {

  if (!userProfile){
    return <Preloader/>
  };

  return (
    <div>
       <img src={userProfile.photo} alt='userPhoto'/>
       <div>{userProfile.name}</div>
       <div>{userProfile.status}</div>
    </div>
  )
}

export default Profile;