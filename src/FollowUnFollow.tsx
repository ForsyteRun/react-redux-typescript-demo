import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import avatar from './../src/img/smile.jpg';
import { AppDispatch, AppState } from "./redux/redux";
import { getFollowThunkCreater, getUnFollowThunkCreater } from "./redux/usersReduser";
import { UserData } from "./types/types";
import s from './Users.module.css';

export type PropsType = {
  el: UserData
};

export const FollowUnFollow: FC<PropsType> = React.memo(({el}) => {

  const isFollowingData = useSelector((state: AppState) => state.users.followingProgress)
  const dispatch: AppDispatch= useDispatch()

  return ( 
        <div className = {s.content}>
            <div>
              <NavLink to = {'/profile/' + el.id}>
                <img src={el.photo || avatar} alt = 'avatar' className = {s.img}/>
              </NavLink>
              <span>{el.name}</span>
            </div>
            <div>
              {el.isFollow 
              ? <button disabled={isFollowingData.some(id => id === el.id )} onClick={() => {  
                dispatch(getUnFollowThunkCreater(el.id) as any) //todo: any;  
              }}>UnFollow</button>
              : <button disabled={isFollowingData.some(id => id === el.id )} onClick={()=>{
                dispatch(getFollowThunkCreater(el.id) as any) //todo: any;    
              }}>Follow</button>}
            </div>
        </div>
        ) 
      });