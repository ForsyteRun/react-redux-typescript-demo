import { Component } from "react";
import { connect } from 'react-redux';
import News from "./News";
import NewsHooks from "./NewsHooks";
import { AppState } from "./redux/redux";
import { getNewsThunkCreater, updateNewsThunkCreater } from './redux/usersReduser';

type MSTPType = {
   status: string
};

type MapDSTPType= {
   getNewsThunkCreater: () => void
   updateNewsThunkCreater: (newStatus: string) => void
};

class NewsConteiner extends Component<MSTPType&MapDSTPType>{

   componentDidMount(){
     this.props.getNewsThunkCreater();
   };

   render(){
      return (
         <div>
            <News {...this.props}/>
            <NewsHooks {...this.props}/>
         </div>
      )
   }
};

const mapStateToProps = (state: AppState): MSTPType => {
   return {
      status: state.users.status
   }
};

export default connect(mapStateToProps, {getNewsThunkCreater,
     updateNewsThunkCreater})(NewsConteiner)