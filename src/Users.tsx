import { FC } from "react";
import Pagination, { PaginationType } from "./common/Pagination";
import { UserData } from "./types/types";
import FollowUnFollow from "./FollowUnFollow";
import UsersFilter from "./UsersFilter";

type UserType = {
  isFollowingData: Array<number>
  isBtnDisable: boolean
  getFollowThunkCreater: (userId: number) => void
  getUnFollowThunkCreater: (userId: number) => void  
};

type PropsType = {
  users: Array<UserData>
  pageSize: number
  currentPageData: number
  getUsersThunkCreater: (pageSize: number, offset: number, filter: string) => void;
};

const Users: FC<UserType&PropsType&PaginationType> = (props) => {
  return (
    <div>
      <UsersFilter {...props}/>
      {props.users.map((el: UserData) => <FollowUnFollow {...props} el = {el} key={el.id}/>)}
      <Pagination {...props}/> 
    </div>
)}

export default Users;