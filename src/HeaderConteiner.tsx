import { Component } from "react";
import {connect} from 'react-redux';
import Header from "./Header";
import { outAuthThunkCreater } from "./redux/authReduser";
import { AppState } from "./redux/redux";
import { getEmail, getIsAuth, getLogin } from "./redux/selectors";

type MapStateToPropsType = {
  login: string | null
  isAuth: boolean
  email: string | null
};

type MapDispatchToPropsType = {
  outAuthThunkCreater: () => void
};

type OwnPropsType = {
  title: string
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class HeaderConteiner extends Component<PropsType>{

 render() {
     return (
      <>
      <h2>{this.props.title}</h2>
      <Header {...this.props}/>
      </>
     ) 
  }
};

const mapStateToProps = (state: AppState): MapStateToPropsType => {
  return {
    login: getLogin(state),
    isAuth: getIsAuth(state),
    email: getEmail(state),
  }
};

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppState>(mapStateToProps, {outAuthThunkCreater})(HeaderConteiner);