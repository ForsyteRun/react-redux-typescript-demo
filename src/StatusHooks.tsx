import { Field, Form, FormikProps, FormikValues, withFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import s from "./Status.module.css";

type PropsType = {
  status: string;
  updateStatusThunkCreater: (newStatus: string) => void
};

const StatusHooksForm: FC<FormikProps<PropsType> & PropsType> = React.memo(
  (props) => {
    const { errors, updateStatusThunkCreater } = props;

    const [editMode, setEditMode] = useState(true);
    const [newStatus, setStatus] = useState(props.status);

    useEffect(() => {
      setStatus(props.status);
    }, [props.status]);

    const deactivateEditMode = () => {
      setEditMode(true);
      updateStatusThunkCreater(newStatus);
    };

    return (
      <div>
        {editMode && (
          <div>
            <span onDoubleClick={() => setEditMode(false)}>{props.status}</span>
          </div>
        )}
        {!editMode && (
          <div style={{ alignSelf: "center" }}>
            <Form name="status">
              <Field
                name="status"
                onBlur={deactivateEditMode}
                value={newStatus}
              />
              {errors.status && <div className={s.errors}>{errors.status}</div>}
            </Form>
          </div>
        )}
      </div>
    );
  }
);

const StatusHooks = withFormik<PropsType, FormikValues>({
  mapPropsToValues: (props) => ({ status: props.status }),

  handleSubmit: (values) => {
    console.log("withFormik NewsHook");
  },
  enableReinitialize: true,
})(StatusHooksForm);

export default StatusHooks;
