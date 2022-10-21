import { Field, Form, FormikProps, FormikValues, withFormik } from "formik";
import React, { FC } from "react";
import s from "./MyProfileAvaForm.module.css";

type FormValuesType = {
  setImageProfile: (imageUrl: string) => void;
  editLogoForm: Boolean;
  avatar: string | null;
};

const MyProfileAvaForm: FC<FormikProps<FormValuesType> & FormValuesType> =
  React.memo(({ editLogoForm }) => {
    return (
      <div>
        {editLogoForm && (
          <Form>
            <Field
              type="text"
              name="avatar"
              placeholder="Enter Url"
              className={s.block}
            ></Field>
            <button type="submit">Submit</button>
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
  handleSubmit: (values: FormikValues, props: any) => {
    props.props.setImageProfile(values.avatar);
  },
  enableReinitialize: true,
})(MyProfileAvaForm);

export default MyProfileAva;
