import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too short password')
    .max(16, 'Too long password')
    .required('Required'),
});

export default loginSchema;
