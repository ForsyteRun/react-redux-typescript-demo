import { Link, Outlet, useMatch} from "react-router-dom";
import cn from 'classnames'
import s from './Layout .module.css'


export const Layout = () => {
  return (
    <>
      <header>
        <CustomLink to="/posts" >Blog</CustomLink>
        <CustomLink to="/about" >About</CustomLink>
        <CustomLink to="/articles" >Articles</CustomLink>
      </header>
      <main className={s.conteiner}>
      <Outlet />
      </main>
      <footer>2022</footer>
    </>
  );
};
const CustomLink = ({children, to}: any) => {
  const match = useMatch(to)
  
  return (
    <Link 
    to = {to}
    style = {{
      color: match ? 'red' : 'black', fontWeight: '600'
    }}
    >{children}</Link>  
  )
};


