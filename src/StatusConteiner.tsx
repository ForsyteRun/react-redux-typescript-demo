import { FormikValues } from "formik";
import { Component } from "react";
import { connect } from 'react-redux';
import { AppState } from "./redux/redux";
import { getNewsThunkCreater, updateNewsThunkCreater } from './redux/usersReduser';
import Status from "./Status";

type MSTPType = ReturnType<typeof mapStateToProps>

type MapDSTPType= {
   getNewsThunkCreater: () => void
   updateNewsThunkCreater: (newStatus: string) => void
};

class StatusConteiner extends Component<MSTPType&MapDSTPType>{
   componentDidMount(){
     this.props.getNewsThunkCreater();
   };

   render(){
      const{getNewsThunkCreater, ...restProps} = this.props;
      
      return (
         <div>
            <Status {...restProps}/>
            {/* <NewsHooks {...this.props}/> */} 
         </div>
      )
   }
};

const mapStateToProps = (state: AppState) => {
   return {
      status: state.users.status
   }
};

export default connect<MSTPType, MapDSTPType, {}, AppState>(mapStateToProps, {getNewsThunkCreater,
     updateNewsThunkCreater})(StatusConteiner)