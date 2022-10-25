import { PureComponent } from "react";
import { MyProfile } from "./MyProfile";
import { Status } from "./Status";

export class MyProfileConteiner extends PureComponent {
  //   if (!isAuth) {
  //     return <Navigate to='/auth' />
  //  } else  {
  //   return null
  //  }

  render() {
    return (
      <div>
        <Status />
        <MyProfile />
      </div>
    );
  }
}
