import { Component } from "react";
import { connect } from "react-redux";
import MyProfile from "./MyProfile";
import { getHeaderThunkCreater } from './redux/authReduser';
import { getImageProfile, getProfileData, setImageProfileThunk, upLoadProfileData } from './redux/myProfileReducer';
import { AppState } from "./redux/redux";

type MSTPType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getImageProfile: () => void
  getProfileData: () => void
  getHeaderThunkCreater: () => void
};

type OwnType = {
  setImageProfileThunk: (imageUrl: string) => void
};

class MyProfileConteiner extends Component<MSTPType & DispatchPropsType & OwnType> {
//   if (!isAuth) {
//     return <Navigate to='/auth' />
//  } else  {
//   return null
//  }

  componentDidMount(){
      this.props.getImageProfile();
      this.props.getProfileData();
    };  

  render() {
    return (
      <div>
        <MyProfile {...this.props}/>
      </div>
    )
  }
};

const mapStateToProps = (state: AppState) => {
  return{
    isAuth: state.auth.isAuth,
    imageProfile: state.myProfile.profileInfo.image,
    isLoading: state.users.isLoading,
    profileData: state.profile.profileInfo,
    editLogoForm: state.myProfile.editLogoForm
  }
};

export default connect(mapStateToProps, 
  {getHeaderThunkCreater, setImageProfileThunk, getImageProfile, getProfileData, upLoadProfileData})
  (MyProfileConteiner);