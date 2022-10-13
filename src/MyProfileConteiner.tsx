import { connect } from "react-redux";
import { Component } from "react";
import MyProfile from "./MyProfile";
import { getHeaderThunkCreater } from './redux/authReduser';
import { getProfileData, upLoadProfileData } from './redux/myProfileReducer';
import { getImageProfile, setImageProfileThunk} from './redux/myProfileReducer';
import { AppState } from "./redux/redux";
import { ProfileType } from "./types/types";

type MSTPType = {
  isAuth: boolean
  imageProfile: string | null
  isLoading: boolean
  profileData: ProfileType
  editLogoForm: boolean
};

type DispatchPropsType = {
  getImageProfile: () => void
  getProfileData: () => void
  getHeaderThunkCreater: () => void
};

type OwnType = {
  setImageProfileThunk: (imageUrl: string) => void
}

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

const mapStateToProps = (state: AppState): MSTPType => {
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