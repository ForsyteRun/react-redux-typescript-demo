import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import style from './Header.module.css';

type PropsType = {
  isAuth: boolean
  outAuthThunkCreater: () => void
}

const Header: FC<PropsType> = React.memo ((props) => {

  const redirAuth = () => {
    props.outAuthThunkCreater();
  }

  return (
    <div className={style.conteiner}>
      <span className={style.login}>
        {props.isAuth 
        ? <NavLink to={'/auth'}> <span onClick={redirAuth}>LogOut</span> </NavLink> 
        : <NavLink to={'/auth'}> <span>Login</span></NavLink>}
      </span>
    </div>
  )
})

export default Header;
