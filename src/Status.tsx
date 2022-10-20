import { Field, Form, FormikProps, FormikValues, withFormik } from "formik";
import React, { FC, useState } from "react";
import { validateStatus } from "./formik/validateSchema";
import s from "./Status.module.css";

type PropsType = {
  status: string;
  updateStatusThunkCreater: (newStatus: string) => void;
};

const StatusForm: FC<FormikProps<PropsType> & PropsType> = React.memo(
  (props) => {
    const { values, errors, updateStatusThunkCreater } = props;
    const [editMode, setEditMode] = useState<boolean>(false);

    const setTrueEditMode = () => {
      setEditMode(false)
      updateStatusThunkCreater(values.status);
    };
  
   return (
      <div>
        {!editMode && (
          <div>
            <div onDoubleClick={() => setEditMode(true)} className={s.validate}>
              {values.status.length > 1 
              ? values.status
              :<span className={s.validateText}>enter status</span>
              }
            </div>
            {errors.status && <div className={s.errors}>{errors.status}</div>}
          </div>
        )}
        {editMode && (
          <div style={{ alignSelf: "center" }}>
            <Form name="status">
              <Field
                name="status"
                onBlur={setTrueEditMode}
                value={values.status}
                autoFocus={true}
              />
              {errors.status && <div className={s.errors}>{errors.status}</div>}
            </Form>
          </div>
        )}
      </div>
    );
  }
);

const Status = withFormik<PropsType, FormikValues>({
  mapPropsToValues: (props) => ({ status: props.status }),
  validationSchema: validateStatus,
  handleSubmit: (values) => console.log(values),
  enableReinitialize: true,
})(StatusForm);

export default Status;
