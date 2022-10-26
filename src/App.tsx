import { FC, lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
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
const Register = lazy(() => import("./Register"));

type MapStateToProps = ReturnType<typeof mapStateToProps>;

const App: FC<MapStateToProps> = (props) => {
  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num + 1);
  };

  const dicrement = () => {
    setNum(num - 1);
  };

  // if (!props.isInitial) {
  //   return <Preloader/>;
  // }

  return (
    <div>
      <Header />
      <div className={styles.App}>
        <button onClick={increment}>+</button>
        <button onClick={dicrement}>-</button>
        <div>Результат:{num}</div>
        <NavLink to="/users" style={{ margin: "20px" }}>
          Users
        </NavLink>
        <NavLink to="/register" style={{ margin: "20px" }}>
          Music
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
              <Route path="about" element={<NoPage />} />
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
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isInitial: state.init.isInitial,
  };
};

export default connect<MapStateToProps, {}, {}, AppState>(mapStateToProps)(App);
