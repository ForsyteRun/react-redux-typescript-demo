import {
  Field,
  Form,
  Formik
} from "formik";
import React, { FC, useEffect } from "react";
import { validateAvatarForm } from "./formik/validateSchema";
import s from "./MyProfileAvaForm.module.css";
import cn from "classnames";
import { AppDispatch } from "./redux/redux";
import { useDispatch } from "react-redux";
import { getImageProfile, setImageProfile } from "./redux/myProfileReducer";

type PropsType = {
  editLogoForm: Boolean;
};

const initialValue = {
  avatar: '' as string,
};

type InitialValue = typeof initialValue;

export const MyProfileAvaForm: FC<PropsType> = React.memo(({ editLogoForm }) => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
      dispatch(getImageProfile()as any); //todo: any
    }, [dispatch])
    
    const onSubmit = (values: InitialValue) => {
      dispatch(setImageProfile(values.avatar) as any); //todo: any
    }

    return (
      <Formik
        initialValues={initialValue}
        onSubmit={(value) => onSubmit(value)}
        validationSchema={validateAvatarForm}
        enableReinitialize={true}
      >
        {({ errors }) =>
          editLogoForm && (
            <Form>
              <Field
                type="text"
                name="avatar"
                placeholder="Enter Url"
                className={s.block}
              />
              {errors.avatar && (
                <div className={cn(s.error)}>{errors.avatar}</div>
              )}
              <button type="submit">Submit</button>
            </Form>
          )
        }
      </Formik>
    );
  }
);
