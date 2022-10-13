import { Component } from "react";
import { connect } from 'react-redux';
import Auth from "./Auth";
import { enterAuthThunkCreater } from "./redux/authReduser";
import { AppState } from "./redux/redux";

type MSTP = {
  login: string | null,
  email: string | null,
  rememberMe: boolean,
  captcha: string | null
};

type MapDSTP = {
  enterAuthThunkCreater: (values: MSTP, setSubmitting: (isSubmitting: boolean) => void) => void
}

type OwnProps = {
  isAuth: boolean
}

class AuthConteiner extends Component<MSTP&MapDSTP&OwnProps> {
  render(){
    return(
      <div>
        <Auth {...this.props}/>
      </div>
    )
  }
}

let mapStateToProps = (state: AppState): MSTP&OwnProps => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    rememberMe: state.auth.rememberMe,
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
  }
};

export default connect<MSTP, MapDSTP, OwnProps, AppState>(mapStateToProps, {enterAuthThunkCreater})(AuthConteiner);