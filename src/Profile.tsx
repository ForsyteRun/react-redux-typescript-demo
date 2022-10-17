import { FC, ReactNode } from "react";
import Preloader from "./Preloader";
import { UserData } from "./types/types";

type PropsType = {
  el: ReactNode
};

const Profile: FC<PropsType> = (props) => {

  // if (!props.userProfile){
  //   return <Preloader/>
  // }
debugger;
  return (
    <div>
         {props.el}
    </div>
  )
}

export default Profile;