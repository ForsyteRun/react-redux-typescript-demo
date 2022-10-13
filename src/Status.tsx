import { FC } from "react";
import Pagination, { PaginationType } from "./common/Pagination";
import { UserData } from "./types/types";
import FollowUnFollow from "./FollowUnFollow";

type UserType = {
  isFollowingData: Array<number>
  getFollowThunkCreater: (followingProgress: boolean, id: number) => void
};

type PropsType = {
  dataUsers: Array<UserData>
};

const Status: FC<UserType&PropsType&PaginationType> = (props) => {

  return (
    <div>
    
      {props.dataUsers.map((el: UserData) => <FollowUnFollow {...props} el = {el} key={el.id}/>)}
      <Pagination {...props}/> 
    </div>
)}

export default Status;