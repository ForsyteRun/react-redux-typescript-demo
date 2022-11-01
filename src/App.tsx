import { FC, lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import About from "./About";
import styles from "./App.module.css";
import { Header } from "./Header";
import { RequireAuth } from "./hoc/RequireAuth";
import { Layout } from "./Layout";
import { MyProfileConteiner } from "./MyProfileConteiner";
import NoPage from "./NoPage";
import { PostEdit } from "./PostEdit";
import { Posts } from "./Posts";
import { PostsSingle } from "./PostSingle";
import Preloader from "./Preloader";
import ProfileConteiner from "./ProfileConteiner";
import { AppState } from "./redux/redux";
import { Users } from "./Users";

const Music = lazy(() => import("./Music"));
const Auth = lazy(() => import("./Auth"));
const Git = lazy(() => import("./Git"));

export const App: FC = () => {

  const isInitial = useSelector((state: AppState) => state.init.isInitial)
  
  const [num3, setNum3] = useState<any>({
    c1: 0,
    c2: 0
  });

  const increment = () => {
    setNum3((a: any) => {
      return {...a, c1: a.c1 + 1}
    });
  };

  const dicrement = () => {
    setNum3((a: any) => {
      return {...a, c2: a.c2 - 1}
    });
  };

  const sumNum = () => {
    setNum3((a: any) => {
      return {...a, 
        c1: a.c1 + 1,
        c2: a.c2 - 1
      }
    })
  }

  // if (!props.isInitial) {
  //   return <Preloader/>;
  // }

  return (
    <div>
      <Header />
      <div className={styles.App}>
        <button onClick={increment}>+</button>
        <button onClick={dicrement}>-</button>
        <button onClick={sumNum}>all</button>
        <div>Результат:{num3.c1}</div>
        <div>Результат:{num3.c2}</div>
        <NavLink to="/users" style={{ margin: "20px" }}>
          Users
        </NavLink>
        <NavLink to="/git" style={{ margin: "20px" }}>
          Git
        </NavLink>
        <NavLink to="/music" style={{ margin: "20px" }}>
          Login
        </NavLink>
        <NavLink to="/myprofile">My Profile</NavLink>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/profile/:id" element={<ProfileConteiner />} />
        </Routes>
        <Suspense
          fallback={
            <div>
              <Preloader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element = {<Layout/>}>
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<PostsSingle />} />
              <Route path="about/*" element={<About/>} />
              <Route path="about-us" element={<Navigate to ='/about' replace />} />
              <Route path="articles" element={<Posts />} />
              <Route path= 'posts/:id/edit' element={<PostEdit />} />
              <Route path="/myprofile" element={
              <RequireAuth>
                 <MyProfileConteiner />  
              </RequireAuth>} />             
            </Route>
            <Route path="*" element={<NoPage />} />
            <Route path="/music" element={<Music />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/git" element={<Git />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};