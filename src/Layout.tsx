import { NavLink, Outlet } from "react-router-dom";
import s from './Layout.module.css'
import cn from 'classnames';

export const Layout = () => {
  return (
    <>
      <header>
        <NavLink to="/posts" >Blog</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'activeLink' : ''} >About</NavLink>
      </header>
      <Outlet />
      <footer>2022</footer>
    </>
  );
};
