import { Component } from "react";
import { connect } from 'react-redux';
import News from "./News";
import NewsHooks from "./NewsHooks";
import { AppState } from "./redux/redux";
import { getNewsThunkCreater, updateNewsThunkCreater } from './redux/usersReduser';

type MSTPType = ReturnType<typeof mapStateToProps>

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

const mapStateToProps = (state: AppState) => {
   return {
      status: state.users.status
   }
};

export default connect<MSTPType, MapDSTPType, {}, AppState>(mapStateToProps, {getNewsThunkCreater,
     updateNewsThunkCreater})(NewsConteiner)