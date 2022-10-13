import * as yup from 'yup';

export const validate = yup.object().shape({
   login: yup.string()
   .required('Required'),
   password: yup.string()
   .required('required'),
   status: yup.string().required('status not done')
   .min(5, 'min 5 simbols')
});

export const validateAuth = yup.object().shape({
   login: yup.string()
   .required('required'),
   password: yup.string()
   .required('required'),
});