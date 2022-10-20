import * as yup from 'yup';

export const validate = yup.object().shape({
   login: yup.string()
   .required('Required'),
   password: yup.string()
   .required('required')
});

export const validateAuth = yup.object().shape({
   login: yup.string()
   .required('required'),
   password: yup.string()
   .required('required'),
});

export const validateStatus = yup.object().shape({
   status: yup.string().min(5, 'too short').required('status not done')
});