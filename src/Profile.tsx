import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom";
import Preloader from "./Preloader";
import { AppState } from "./redux/redux";
import { UserData } from "./types/types";

type PropsType = {
  userProfile: UserData
};

export const Profile: FC<PropsType> = React.memo(() => {

  const userProfile = useSelector((state: AppState) => state.users.userProfile)
  const filter = useSelector((state: AppState) => state.users.filter)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const goBack = () => {
    navigate(-1)
  };

  const goHome = () => {
    navigate('/', {replace: true})
  };

  if (!userProfile){
    return <Preloader/>
  };

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <button onClick={goHome}>Go home</button>
       <img src={userProfile.photo} alt='userPhoto'/>
       <div>{userProfile.name}</div>
       <div>{userProfile.status}</div>
    </div>
  )
});