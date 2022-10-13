import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setFollowUnFollow} from './redux/profileReduser';
import { updateNewsThunkCreater} from './redux/statusReduser'

class UserConteiner extends Component{
   componentDidMount(){
      //@ts-ignore
      this.props.updateNewsThunkCreater('qqq')
      
   };

   render(){
       return(
         <div> 
            111
         </div>
       )
   }
};

const mapDispatchToProps = () => {
   return {

   }
};

export default connect (mapDispatchToProps, {setFollowUnFollow, updateNewsThunkCreater})(UserConteiner);