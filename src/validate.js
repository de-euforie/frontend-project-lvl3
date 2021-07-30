import * as yup from 'yup';

export default (link, feeds) => {
  const schema1 = yup.string().url();
  if (!schema1.isValidSync(link)) {
    return 'The link must be a valid URL';
  }
  const schema2 = yup.string().notOneOf(feeds);
  if (!schema2.isValidSync(link)) {
    return 'RSS already exists';
  }
  return '';
};
