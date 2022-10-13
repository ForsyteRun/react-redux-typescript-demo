import { FC, lazy, Suspense, useState } from 'react';
import styles from './App.module.css';
import { connect } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import UsersConteiner from './UsersConteiner';
import ProfileConteiner from './ProfileConteiner';
import HeaderConteiner from './HeaderConteiner';
import Dashboard from './Dashboard';
import Preferenses from './Preferenses';
import Preloader from './Preloader';
import MyProfileConteiner from './MyProfileConteiner';
import NoPage from './NoPage';
import { AppState } from './redux/redux';

const MusicConteiner = lazy(() => import('./MusicConteiner'));
const AuthConteiner = lazy(() => import('./AuthConteiner'));
const RegisterConteiner = lazy(() => import('./RegisterConteiner'));


type MapStateToProps = {
  isInitial: boolean
};
type MapDispatchToProps = {};
type OwnProps = {};

type AppType = MapStateToProps & MapDispatchToProps & OwnProps;

const App: FC<AppType> = (props) => {

  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num + 1)
  };

  const dicrement = () => {
    setNum(num - 1)
  };

  // if (!props.isInitial) {
  //   return <Preloader/>;
  // }

  return (
    <div>
      <HeaderConteiner title = 'Start building'/>
      <div className={styles.App}>
        <button onClick={increment}>+</button>
        <button onClick={dicrement}>-</button>
        <div>Результат:{num}</div>
        <NavLink to='/users' style={{ margin: '20px' }}>Users</NavLink>
        <NavLink to='/register' style={{ margin: '20px' }}>Music</NavLink>
        <NavLink to='/music' style={{ margin: '20px' }}>Login</NavLink>
        <NavLink to='/myprofile'>My Profile</NavLink>
        <Routes>
          <Route path='/' element={<UsersConteiner />} />
          <Route path='/users' element={<UsersConteiner />} />
          <Route path='/profile/:id' element={<ProfileConteiner />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/preferenses' element={<Preferenses />} />
        </Routes>
        <Suspense fallback={<div><Preloader/></div>}>
          <Routes>
            <Route path='*' element={<NoPage/>} />
            <Route path="/music" element={<MusicConteiner />} />
            <Route path='/auth' element={<AuthConteiner isAuth={false} />} />
            <Route path='/register' element={<RegisterConteiner />} />
            <Route path='/myprofile' element={<MyProfileConteiner />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState): MapStateToProps => {
  return {
    isInitial: state.init.isInitial
  }
};

export default connect(mapStateToProps)(App)
