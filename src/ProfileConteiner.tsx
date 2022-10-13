import React, { Component } from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUsersThunkCreater } from './redux/statusReduser';
import { AppState } from "./redux/redux";
import { compose } from "redux";

type MSTPT = {
  userProfile: boolean
};

type MapDTP = {
  getUsersThunkCreater: (match: number) => void
}

class ProfileConteiner extends Component<MSTPT&MapDTP>{
  
  componentDidMount(){
    //@ts-ignore
    let match = this.props.router.params.id;
    this.props.getUsersThunkCreater(match);
  }

  render(){
    return (
      <div>
        <Profile data={this.props.userProfile}/>
      </div>
    )
  }
}

let mapStateToProps = (state: AppState): MSTPT => {
  return{
    userProfile: state.status.isLoading
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
  connect(mapStateToProps, {getUsersThunkCreater}),
  withRouter)(ProfileConteiner)