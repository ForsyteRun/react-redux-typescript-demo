import React, { Component } from "react";
import Register from "./Register";
import {connect} from 'react-redux';
import { compose } from "redux";
import { AppState } from "./redux/redux";

type PropsType = ReturnType<typeof mapStateToProps>
class RegisterConteiner extends Component<PropsType>{
   
   render(){
      return(
         <Register {...this.props}/>
      )
   }
};

const mapStateToProps = (state: AppState) => {
   return {
      login: state.auth.login,
      email: state.auth.email
   }
};
   


export default compose<React.ComponentType>(
   connect(mapStateToProps),
   )(RegisterConteiner) 