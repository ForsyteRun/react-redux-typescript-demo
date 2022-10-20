import { PureComponent } from "react";
import { connect } from 'react-redux';
import { AppState } from "./redux/redux";
import { getStatusThunkCreater, updateStatusThunkCreater } from './redux/myProfileReducer';
import Status from "./Status";
import StatusHooks from "./StatusHooks";

type MSTPType = ReturnType<typeof mapStateToProps>

type MapDSTPType= {
   getStatusThunkCreater: () => void
   updateStatusThunkCreater: (newStatus: string) => void
};
//render two ways///
class StatusConteiner extends PureComponent<MSTPType&MapDSTPType>{
   componentDidMount(){
      this.props.getStatusThunkCreater();
   };

  render(){  
   const{getStatusThunkCreater, ...restProps} = this.props;
      return (
         <div>
            <Status {...restProps}/>
            <StatusHooks {...restProps}/> 
         </div>
      )
   }
};

const mapStateToProps = (state: AppState) => {
   return {
      status: state.myProfile.status
   }
};

export default connect<MSTPType, MapDSTPType, {}, AppState>(mapStateToProps, {getStatusThunkCreater,
     updateStatusThunkCreater})(StatusConteiner)