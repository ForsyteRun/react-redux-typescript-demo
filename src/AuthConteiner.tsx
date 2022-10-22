import { Component } from "react";
import { connect } from 'react-redux';
import Auth from "./Auth";
import { enterAuthThunkCreater, getAuthThunkCreater } from "./redux/authReduser";
import { AppState } from "./redux/redux";

type MSTP = ReturnType<typeof mapStateToProps>

type MapDSTP = {
  enterAuthThunkCreater: (values: MSTP, setSubmitting: (isSubmitting: boolean) => void) => void
  getAuthThunkCreater: () => void
};

class AuthConteiner extends Component<MSTP&MapDSTP> {

  componentDidMount(){
    this.props.getAuthThunkCreater()
  };

  render(){
    return(
      //@ts-ignore
      <div><Auth {...this.props}/>
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