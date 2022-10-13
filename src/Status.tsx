import { FC } from "react";
import Pagination, { PaginationType } from "./common/Pagination";
import { UserData } from "./types/types";
import User from "./User";

type UserType = {
  isFollowingData: Array<number>
  getFollowThunkCreater: (followingProgress: boolean, id: number) => void
};

type PropsType = {
  dataUsers: Array<UserData>
}

const Status: FC<UserType&PropsType&PaginationType> = (props) => {

  return (
    <div>
      {/* <NewsConteiner {...props} /> */}
      {props.dataUsers.map((el: UserData) => <User {...props} el = {el} key={el.id}/>)}
      <Pagination {...props}/> 
    </div>
)}

export default Status;