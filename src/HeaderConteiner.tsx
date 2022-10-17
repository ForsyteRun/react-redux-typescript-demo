import { Component } from "react";
import {connect} from 'react-redux';
import Header from "./Header";
import { outAuthThunkCreater } from "./redux/authReduser";
import { AppState } from "./redux/redux";
import { getEmail, getIsAuth, getLogin } from "./redux/selectors";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
  outAuthThunkCreater: () => void
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderConteiner extends Component<PropsType>{

 render() {
     return (
      <>
        <Header {...this.props}/>
      </>
     ) 
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    login: getLogin(state),
    isAuth: getIsAuth(state),
    email: getEmail(state),
  }
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppState>(mapStateToProps, {outAuthThunkCreater})(HeaderConteiner);