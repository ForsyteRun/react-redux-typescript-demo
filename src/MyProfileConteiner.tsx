import { PureComponent } from "react";
import { MyProfile } from "./MyProfile";
import { Status } from "./Status";

export class MyProfileConteiner extends PureComponent {
  //   if (!isAuth) {
  //     return <Navigate to='/auth' />
  //  } else  {
  //   return null
  //  }

  componentDidMount() {
    //this.props.getAuthThunkCreater();
  }

  render() {
    return (
      <div>
        <Status />
        <MyProfile />
      </div>
    );
  }
}
