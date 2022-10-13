import React, { Component } from "react";
import Register from "./Register";
import {connect} from 'react-redux';
import { compose } from "redux";
import { AppState } from "./redux/redux";

type PropsType = {
   login:  string | null
   email: string | null
};

class RegisterConteiner extends Component<PropsType>{
   
   render(){
      return(
         <Register {...this.props}/>
      )
   }
};

const mapStateToProps = (state: AppState): PropsType => {
   return {
      login: state.auth.login,
      email: state.auth.email
   }
};
   


export default compose<React.ComponentType>(
   connect(mapStateToProps),
   )(RegisterConteiner) 