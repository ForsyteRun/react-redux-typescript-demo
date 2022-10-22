import { PureComponent } from "react";
import { connect } from 'react-redux';
import Auth, { PropsType } from "./Auth";
import { enterAuthThunkCreater, getAuthThunkCreater } from "./redux/authReduser";
import { AppState } from "./redux/redux";

type MSTP = PropsType&OwnProps;

type MapDSTP = {
  enterAuthThunkCreater: (values: PropsType) => void;
  getAuthThunkCreater: () => void
};

type OwnProps = {
  isAuth: boolean
};
class AuthConteiner extends PureComponent<MSTP&MapDSTP&OwnProps> {

  componentDidMount(){
    this.props.getAuthThunkCreater()
  };

  render(){
    return(
      <div>     
        <Auth {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    rememberMe: state.auth.rememberMe,
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
  }
};

export default connect<MSTP, MapDSTP, {}, AppState>(mapStateToProps, {enterAuthThunkCreater, getAuthThunkCreater})(AuthConteiner);