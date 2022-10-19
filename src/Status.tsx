import { Field, Form, FormikProps, FormikValues, withFormik } from "formik";
import { ChangeEvent, FC, useState } from "react";

type PropsType = {
   status: string
   getStatusThunkCreater:()=>void
   updateStatusThunkCreater: (newStatus: string) => void
};

const StatusForm: FC<FormikProps<PropsType>&PropsType>=(props)=> {
    
     const{ values, touched, handleChange, handleSubmit, errors, status } = props;
      
     const[editMode, setEditMode] = useState<boolean>(false)
     
     if(editMode){
      props.getStatusThunkCreater()
      // props.updateStatusThunkCreater(values.status)
      console.log(props);
     };
     console.log(props);
     
   return(
      <div>
          { !editMode &&
               <div>
                  <span onDoubleClick ={()=>setEditMode(true)}> 
                     {props.values.status}
                  </span>
               </div>
            }
            { editMode &&
               <div style={{alignSelf:'center'}}>          
                 <Form name = 'status'>
                     <Field 
                     name = 'status'
                     onBlur={()=>setEditMode(false)} 
                     value = {values.status}    
                     autoFocus = {true}
                     />
                     {/* //{touched.status && <div className ={styles.errors}>{errors.status}</div>} */}
                  </Form>
               </div>        
            } 
      </div>
   )
};
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
   mapPropsToValues: (props) => ({ status: props.status}),

   handleSubmit: (values) => console.log(values),
   
   enableReinitialize: true,   
 })(StatusForm);

export default Status;