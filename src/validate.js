import * as yup from 'yup';

export default (url, feeds) => {
  const urls = feeds.map(({ url }) => url);
  const schema = yup.string().url().notOneOf(urls);

  try {
    schema.validateSync(url);
    console.log('aaa', url);
    return null;
  } catch (e) {
    console.log('ffff', url);
    return e.message;
  }
};
