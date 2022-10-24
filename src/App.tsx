import { FC, lazy, Suspense, useState } from 'react';
import styles from './App.module.css';
import { connect } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import UsersConteiner from './UsersConteiner';
import ProfileConteiner from './ProfileConteiner';
import {Header} from './Header';
import Dashboard from './Dashboard';
import Preferenses from './Preferenses';
import Preloader from './Preloader';
import MyProfileConteiner from './MyProfileConteiner';
import NoPage from './NoPage';
import { AppState } from './redux/redux';

const Music = lazy(() => import('./Music'));
const Auth = lazy(() => import('./Auth'));
const Register = lazy(() => import('./Register'));

type MapStateToProps = ReturnType<typeof mapStateToProps>

const App: FC<MapStateToProps> = (props) => {

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
      <Header />
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
            <Route path="/music" element={<Music />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myprofile' element={<MyProfileConteiner />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    isInitial: state.init.isInitial
  }
};

export default connect<MapStateToProps, {}, {}, AppState>(mapStateToProps)(App)
