import { FC } from "react";
import Pagination, { PaginationType } from "./common/Pagination";
import { UserData } from "./types/types";
import FollowUnFollow from "./FollowUnFollow";

type UserType = {
  isFollowingData: Array<number>
  getFollowThunkCreater: (followingProgress: boolean, id: number) => void
};

type PropsType = {
  users: Array<UserData>
};

const Users: FC<UserType&PropsType&PaginationType> = (props) => {
  console.log(props)
  return (
    <div>
      {props.users.map((el: UserData) => <FollowUnFollow {...props} el = {el} key={el.id}/>)}
      {/* <Pagination {...props}/>  */}
    </div>
)}

export default Users;