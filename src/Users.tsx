import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "./common/Pagination";
import { FollowUnFollow } from "./FollowUnFollow";
import Preloader from "./Preloader";
import { AppDispatch, AppState } from "./redux/redux";
import { getUsersThunkCreater } from "./redux/usersReduser";
import { UserData } from "./types/types";
import { UsersFilter } from "./UsersFilter";

export const Users: FC = React.memo(() => {

  const isLoading = useSelector((state: AppState) => state.users.isLoading)
  const users = useSelector((state: AppState) => state.users.users)
  const pageSize = useSelector((state: AppState) => state.users.pageSize)
  const currentPageData = useSelector((state: AppState) => state.users.currentPage)
  const filter = useSelector((state: AppState) => state.users.filter)
  console.log('render');
  
  useEffect(() => {
    dispatch(getUsersThunkCreater(pageSize, currentPageData-1, filter) as any) //todo: any
  }, [])
  
  const dispatch: AppDispatch= useDispatch()

  if(isLoading){
    return  <Preloader />
  }

  return (
    <div>
      <UsersFilter  />
      {
      Array.from(users).map((el: UserData) => <FollowUnFollow el = {el} key={el.id}/>)
      }
      <Pagination /> 
    </div>
)});