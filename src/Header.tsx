import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';

type PropsType = {
  isAuth: boolean
  outAuthThunkCreater: () => void
}

const Header: FC<PropsType> = React.memo (({isAuth, outAuthThunkCreater}) => {

  const redirAuth = () => {
    outAuthThunkCreater();
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
})

export default Header;
