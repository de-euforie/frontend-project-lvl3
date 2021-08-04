import * as yup from 'yup';

export default (url, feeds) => {
  const urls = feeds.map(({ url }) => url);
  const schema = yup.string().url().notOneOf(urls);

  try {
    schema.validateSync(url);
    console.log('валидация прошла', url);
    return null;
  } catch (e) {
    console.log('валидация не прошла', url);
    return e.message;
  }
};
