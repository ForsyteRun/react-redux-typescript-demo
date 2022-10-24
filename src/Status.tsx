import {
  Field,
  Form,
  Formik
} from "formik";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateStatus } from "./formik/validateSchema";
import { getStatusThunkCreater, updateStatusThunkCreater } from "./redux/myProfileReducer";
import { AppDispatch, AppState } from "./redux/redux";
import s from "./Status.module.css";

const initialValue = {
  status: "" as string
};

type InitType = typeof initialValue;

export const Status: FC = React.memo(() => {
  
  const status = useSelector((state: AppState) => state.myProfile.status)
  const dispatch: AppDispatch = useDispatch()
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getStatusThunkCreater() as any)//todo: any
  }, [])

  const setTrueEditMode = (values: InitType) => {
    setEditMode(false);
    dispatch(updateStatusThunkCreater(values.status) as any)//todo: any
    console.log(values.status);
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(value) => setTrueEditMode(value)}
      validationSchema={validateStatus}
      enableReinitialize={true}
    >
      {({values, errors, handleSubmit}) => (
        <Form>
          {!editMode && (
            <div>
              <div
                onDoubleClick={() => setEditMode(true)}
                className={s.validate}
              >
                {status.length > 1 ? (
                  status
                ) : (
                  <span className={s.validateText}>enter status</span>
                )}
              </div>
              {errors.status && <div className={s.errors}>{errors.status}</div>}
            </div>
          )}
          {editMode && (
            <div style={{ alignSelf: "center" }}>
              <Field
                name="status"
                onBlur={handleSubmit}
                value={values.status}
                autoFocus={true}
              />
              {errors.status && <div className={s.errors}>{errors.status}</div>}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
});
