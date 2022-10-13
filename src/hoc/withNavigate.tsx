import { AppState } from '../redux/redux';
import React, { Component } from "react"
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

type MSTPN = {
   isAuth: boolean
};

const mapStateToPropsNavigate = (state: AppState): MSTPN => {
   return {
      isAuth: state.auth.isAuth,
   }
};

export const withNavigate = (Compon: React.ComponentType<MSTPN>) => {
   class NavigateComponent extends Component<MSTPN>{
      render(){
         if(!this.props.isAuth) return <Navigate to='/auth'/>   
         return <Compon {...this.props}/>
      }
   } 

   const ConnectWithNavigate = connect(mapStateToPropsNavigate)(NavigateComponent)

   return ConnectWithNavigate;
}