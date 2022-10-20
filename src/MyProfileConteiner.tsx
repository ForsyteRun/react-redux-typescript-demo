import { PureComponent } from "react";
import { connect } from "react-redux";
import MyProfile from "./MyProfile";
import { getHeaderThunkCreater } from './redux/authReduser';
import { getImageProfile, getProfileData, setImageProfile, setProfileData } from './redux/myProfileReducer';
import { AppState } from "./redux/redux";
import StatusConteiner from "./StatusConteiner";
import { ProfileType } from "./types/types";

type MSTPType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getImageProfile: () => void
  getProfileData: () => void
  setImageProfile: (imageUrl: string) => void
  setProfileData: (imageUrl: ProfileType) => void
};
class MyProfileConteiner extends PureComponent<MSTPType & DispatchPropsType> {
  
//   if (!isAuth) {
//     return <Navigate to='/auth' />
//  } else  {
//   return null
//  }

  componentDidMount(){
      getImageProfile();
      getProfileData();
      //getHeaderThunkCreater();
    };  
  
  render() {   
    
    return (
      <div>
        <StatusConteiner  />
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
  }
};

export default connect(mapStateToProps, 
  {setImageProfile, getImageProfile, getProfileData, setProfileData})
  (MyProfileConteiner);