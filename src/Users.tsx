import React, { FC, useEffect } from "react";
import {Pagination} from "./common/Pagination";
import { UserData } from "./types/types";
import {UsersFilter} from "./UsersFilter";
import { FollowUnFollow } from "./FollowUnFollow";
import { AppDispatch, AppState } from "./redux/redux";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "./Preloader";
import { getUsersThunkCreater } from "./redux/usersReduser";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export const Users: FC = React.memo(() => {

  useEffect(() => {
    dispatch(getUsersThunkCreater(pageSize, currentPageData-1) as any) //todo: any
  }, [])

  const isLoading = useSelector((state: AppState) => state.users.isLoading)
  const users = useSelector((state: AppState) => state.users.users)
  const pageSize = useSelector((state: AppState) => state.users.pageSize)
  const currentPageData = useSelector((state: AppState) => state.users.currentPage)
  const last5 = useSelector((state: AppState) => state.users.filter.last5)

  const dispatch: AppDispatch= useDispatch()

  if(isLoading){
    return  <Preloader />
  }

  if(last5){
   const res = users.slice(users.length-5, users.length-1)
   console.log(res);
  }

  return (
    <div>
      <UsersFilter  />
      {users.map((el: UserData) => <FollowUnFollow el = {el} key={el.id}/>)}
      <Pagination /> 
    </div>
)});