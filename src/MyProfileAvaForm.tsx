import { Field, Form, FormikProps, FormikValues, withFormik } from "formik";
import React, { FC } from "react";
import { validateAvatarForm } from "./formik/validateSchema";
import s from "./MyProfileAvaForm.module.css";
import cn from 'classnames';

type FormValuesType = {
  setImageProfile: (imageUrl: string) => void;
  editLogoForm: Boolean;
  avatar: string | null;
};

const MyProfileAvaForm: FC<FormikProps<FormValuesType> & FormValuesType> =
  React.memo((props) => {
    const{editLogoForm, errors} = props
    
    return (
      <div>
        {editLogoForm && (
          <Form>
            <Field
              type="text"
              name="avatar"
              placeholder="Enter Url"
              className={s.block}
            />      
            {errors.avatar && <div className={cn(s.error)}>{errors.avatar}</div>}    
            <button type="submit" >Submit</button>
          </Form>
        )}
      </div>
    );
  });

const MyProfileAva = withFormik<FormValuesType, FormikValues>({
  mapPropsToValues: (props) => ({
    editLogoForm: props.editLogoForm,
    avatar: '',
  }),
  validationSchema: validateAvatarForm,
  handleSubmit: (values: FormikValues, props: any) => {
    props.props.setImageProfile(values.avatar);
  },
  enableReinitialize: true,
})(MyProfileAvaForm);

export default MyProfileAva;
