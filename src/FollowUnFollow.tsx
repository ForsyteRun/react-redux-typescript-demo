import { FC } from "react";
import { NavLink } from "react-router-dom";
import style from './Users.module.css';
import avatar from './../src/img/smile.jpg';
import { UserData } from "./types/types";

export type OwnType = {
  el: UserData
  isFollowingData: Array<number>
  getFollowThunkCreater: (followingProgress: boolean, userId: number) => void
  getUnFollowThunkCreater: (followingProgress: boolean, userId: number) => void
}

const FollowUnFollow: FC<OwnType> = (props) => {
  debugger;
  return ( 
        <div className = {style.content}>
            <div>
              <NavLink to = {'/profile/' + props.el.id}>
                <img src={props.el.photo || avatar} alt = 'avatar' className = {style.img}/>
              </NavLink>
            </div>
            <div>
              {props.el.isFollow 
              ? <button onClick={() => {  
                props.getUnFollowThunkCreater(false, props.el.id);  
              }}>UnFollow</button>
              : <button  onClick={()=>{
                props.getFollowThunkCreater(true, props.el.id);    
              }}>Follow</button>}
            </div>
        </div>
        ) 
      }

export default FollowUnFollow;