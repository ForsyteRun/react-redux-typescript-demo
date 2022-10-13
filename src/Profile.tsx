import React, { FC } from "react";
import Preloader from "./Preloader";

type PropsType = {
  data: boolean
};

const Profile: FC<PropsType> = (props) => {

  if (!props.data){
    return <Preloader/>
  }

  return (
    <div>
      <div>{props.data}</div>
      <div>{props.data}</div>
    </div>
  )
}

export default Profile;