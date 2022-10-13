import React, { Component } from "react";
import Music from "./Music";
import {connect} from 'react-redux';
import { withNavigate } from "./hoc/withNavigate";
import { compose } from "redux";

type PropsType = {}
class MusicConteiner extends Component<PropsType>{

   render(){
      return (
         <div>
            <Music {...this.props}/>
         </div>
      )
   }
};

export default  compose<React.ComponentType>(
   connect(),
   withNavigate
   )(MusicConteiner);