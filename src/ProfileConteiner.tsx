import React, { Component } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { compose } from "redux";
import { AppState } from "./redux/redux";
import { getUserProfileThunkCreater } from './redux/usersReduser';

type MSTPT = ReturnType<typeof mapStateToProps>

type MapDTP = {
  getUserProfileThunkCreater: (match: number) => void
};
class ProfileConteiner extends Component<MSTPT&MapDTP>{
  
  componentDidMount(){
    //@ts-ignore
    let match: number = this.props.router.params.id;
    this.props.getUserProfileThunkCreater(match);
  }

  render(){
    return (
      <div>
      
      </div>
    )
  }
};

const mapStateToProps = (state: AppState) => {
  return{
    userProfile: state.users.users
  }
}
 
const withRouter = (WrappedComponent: React.ComponentType) => (props: any) => {
  let params = useParams();
  let location = useLocation();

  return (
    <WrappedComponent
    {...props}
    router = {{location, params}}   
    />
  )
}

export default compose <React.ComponentType>(
  connect(mapStateToProps, {getUserProfileThunkCreater}),
  withRouter)(ProfileConteiner)