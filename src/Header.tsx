import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';
import { outAuthThunkCreater } from "./redux/authReduser";
import { AppDispatch, AppState } from "./redux/redux";
import { getIsAuth } from "./redux/selectors";

export const Header: FC = React.memo (() => {

  const isAuth = useSelector((state: AppState) => getIsAuth(state))
  const dispatch: AppDispatch = useDispatch()

  const redirAuth = () => {
    dispatch(outAuthThunkCreater() as any) //todo: any
  };

  return (
    <div className={s.conteiner}>
      <span className={s.login}>
        {isAuth 
        ? <NavLink to={'/auth'}> <span onClick={redirAuth}>LogOut</span> </NavLink> 
        : <NavLink to={'/auth'}> <span>Login</span></NavLink>}
      </span>
    </div>
  )
});

