import React, { FC, useEffect } from "react";
import {Pagination} from "./common/Pagination";
import { UserData } from "./types/types";
import {UsersFilter} from "./UsersFilter";
import { FollowUnFollow } from "./FollowUnFollow";
import { AppDispatch, AppState } from "./redux/redux";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "./Preloader";
import { getUsersThunkCreater } from "./redux/usersReduser";

export const Users: FC = React.memo((props) => {

  useEffect(() => {
    dispatch(getUsersThunkCreater(pageSize, currentPageData-1) as any) //todo: any
  }, [])

  const isLoading = useSelector((state: AppState) => state.users.isLoading)
  const users = useSelector((state: AppState) => state.users.users)
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const currentPageData = useSelector((state: AppState) => state.users.currentPage);
  const dispatch: AppDispatch= useDispatch()

  if(isLoading){
    return  <Preloader />
  }

  return (
    <div>
      <UsersFilter  />
      {users.map((el: UserData) => <FollowUnFollow el = {el} key={el.id}/>)}
      <Pagination /> 
    </div>
)});