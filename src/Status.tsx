import { Field, Form, FormikProps, FormikValues, withFormik } from "formik";
import { FC, useState } from "react";

type PropsType = {
   status: string
   updateNewsThunkCreater: (newStatus: string) => void
};

const StatusForm: FC<FormikProps<PropsType>&PropsType>=(props)=> {
    
     const{ values, touched, handleChange, handleSubmit, errors, status } = props;
      console.log(props);
      
     const[editMode, setEditMode] = useState<boolean>(true)
   return(
      <div>
          { editMode &&
               <div>
                  <span onDoubleClick ={()=>setEditMode(false) as any}> 
                     {props.status}
                  </span>
               </div>
            }
            { !editMode &&
               <div style={{alignSelf:'center'}}>          
                 <Form name = 'status'>
                     <Field 
                     name = 'status' 
                     onBlur={()=>setEditMode(true)} 
                     value = {props.status} 
                     onChange = {()=>handleChange}       
                     autoFocus = {true}
                     />
                     {/* //{touched.status && <div className ={styles.errors}>{errors.status}</div>} */}
                  </Form>
               </div>        
            } 
      </div>
   )
};

   // activeEditMode = () => {
   //    this.setState ({
   //       editMode: false,
   //    })
   // };

   // deactivateEditMode = () => {
   //    this.setState({
   //       editMode: true,
   //    })
   //    this.props.updateNewsThunkCreater(this.state.status);
   // };

   // const[editMode, setEditMode] = useState(true)as any
   // const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
   //    // this.setState({
   //    //    status: e.target.value
   //    // })
   // };

   //     return(
   //       <div>vv
   //          { editMode &&
   //             <div>
   //                <span onDoubleClick ={setEditMode(false)}> 
   //                   {props.status}
   //                </span>
   //             </div>
   //          }
   //          { !editMode &&
   //             <div style={{alignSelf:'center'}}>          
   //               <Form name = 'status'>
   //                   <Field 
   //                   name = 'status' 
   //                   onBlur={setEditMode(true)} 
   //                   value = {props.status} 
   //                   onChange = {onChangeStatus}
   //                   autoFocus = {true}
   //                   />
   //                   {/* //{touched.status && <div className ={styles.errors}>{errors.status}</div>} */}
   //                </Form>
   //             </div>        
   //          } 
   //       </div>
   //    )
   // }

const Status = withFormik<PropsType, FormikValues>({
   mapPropsToValues: (props) => ({ status: '22' }),

   handleSubmit: (values, props) => {
      props.props.updateNewsThunkCreater(values.status)
   },
   enableReinitialize: true, 
 })(StatusForm);

export default Status;