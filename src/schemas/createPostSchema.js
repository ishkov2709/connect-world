import * as Yup from 'yup';

const createPostsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  place: Yup.string().required('Required'),
});

export default createPostsSchema;
