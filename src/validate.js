import * as yup from 'yup';

export default (link, feeds) => {
  const schema = yup.string().url().notOneOf(feeds);

  try {
    schema.validateSync(link);
    console.log('aaa', link);
    return null;
  } catch (e) {
    console.log('ffff', link);
    return e.message;
  }
  /* if (!schema1.isValidSync(link)) {
    return 'The link must be a valid URL';
  }
  const schema2 = yup.string().notOneOf(feeds);
  if (!schema2.isValidSync(link)){
    return 'RSS already exists';
  }
  return ''; */
};
