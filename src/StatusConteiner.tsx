import { Component } from "react";
import { connect } from 'react-redux';
import { AppState } from "./redux/redux";
import { getStatusThunkCreater, updateStatusThunkCreater } from './redux/myProfileReducer';
import Status from "./Status";

type MSTPType = ReturnType<typeof mapStateToProps>

type MapDSTPType= {
   getStatusThunkCreater: () => void
   updateStatusThunkCreater: (newStatus: string) => void
};

class StatusConteiner extends Component<MSTPType&MapDSTPType>{
   componentDidMount(){
      console.log('did mount');
     this.props.getStatusThunkCreater();
   };

   componentDidUpdate(){
      console.log('did update');
      
      this.props.getStatusThunkCreater();
   };

   render(){
console.log(this.props)

      
      return (
         <div>
            <Status {...this.props}/>
            {/* <NewsHooks {...this.props}/> */} 
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