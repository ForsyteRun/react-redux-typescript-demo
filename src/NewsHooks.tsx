import { Field, Form, withFormik } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";

type PropsType = {
   status: string
   updateNewsThunkCreater: (newStatus: string) => void
}

export const NewsHooksForm: FC<PropsType> = (props) => {
   const [editMode, setEditMode] = useState(true);
   const [newStatus, setStatus] = useState(props.status);
   
   useEffect(() => {
      setStatus(props.status)
   }, [props.status])

   const activeEditMode = () => {
      setEditMode(false)
   };

   const deactivateEditMode = () => {
      setEditMode(true);
      props.updateNewsThunkCreater(newStatus);
   };

   const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.target.value)
   };

      return (
         <div>
            {editMode &&
               <div>
                  <span onDoubleClick={activeEditMode}>
                     {props.status}
                  </span>
               </div>
            }
            {!editMode &&
               <div style={{ alignSelf: 'center' }}>                  
                  <Form name='status'>
                     <Field
                        name='status'
                        onBlur={deactivateEditMode} 
                        onChange = {onChangeStatus}
                        value ={newStatus}
                        />
                     {/* //{touched.status && <div className={styles.errors}>{errors.status}</div>} */}
                  </Form>
               </div>
            }
         </div>
      )
   };

   const NewsHook = withFormik({
   mapPropsToValues: () => ({ status: '' }),

   handleSubmit: (values) => {
      console.log('withFormik NewsHook');
   }})(NewsHooksForm)

export default NewsHook;