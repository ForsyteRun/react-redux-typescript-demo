import { Field, Form, withFormik } from "formik";
import { ChangeEvent, PureComponent } from "react";

type PropsType = {
   status: string
   updateNewsThunkCreater: (newStatus: string) => void
};

type StateProps = {
   editMode: boolean
   status: string
}

class NewsForm extends PureComponent<PropsType, StateProps>{

   state = {
      editMode: true,
      status: this.props.status,
   };

   componentDidUpdate(prevProps: PropsType, prevState: StateProps){
  
      if((prevProps.status || prevState.status) !== this.props.status){
         this.setState({
            status:  this.props.status
         })
      }
   };

   activeEditMode = () => {
      this.setState ({
         editMode: false,
      })
   };

   deactivateEditMode = () => {
      this.setState({
         editMode: true,
      })
      this.props.updateNewsThunkCreater(this.state.status);
   };

   onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
         status: e.target.value
      })
   };

   render(){
      return(
         <div>
            { this.state.editMode &&
               <div>
                  <span onDoubleClick={this.activeEditMode}>
                     {this.props.status}
                  </span>
               </div>
            }
            { !this.state.editMode &&
               <div style={{alignSelf:'center'}}>          
                 <Form name = 'status'>
                     <Field 
                     name = 'status' 
                     onBlur={this.deactivateEditMode} 
                     value = {this.state.status} 
                     onChange = {this.onChangeStatus}
                     autoFocus = {true}
                     />
                     {/* //{touched.status && <div className ={styles.errors}>{errors.status}</div>} */}
                  </Form>
               </div>        
           } 
         </div>
      )
   }
};

const News = withFormik({
   mapPropsToValues: () => ({ status: '' }),

   handleSubmit: (values) => {
      console.log('withFormik News');
   },
 
 })(NewsForm);

export default News;