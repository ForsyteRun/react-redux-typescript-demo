import * as yup from 'yup';

export const validateAuth = yup.object().shape({
   login: yup.string()
   .required('required'),
   password: yup.number()
   .required('required'),
});

export const validateStatus = yup.object().shape({
   status: yup.string().min(5, 'too short').required('status not done')
});

export const validateAvatarForm = yup.object().shape({
   avatar: yup.string().url('must be url').nullable()
});

export const validateProfileData = yup.object().shape({
   lookinForJob: yup.string().required('field is require'),
   lookinForJobDiiscription: yup.string().required('field is require'),
   fullName: yup.string().required('field is require'),
});