import * as yup from 'yup';

export default (link, feeds) => {
  const urls = feeds.map(({ url }) => url);
  const schema = yup.string().url().notOneOf(urls);

  try {
    schema.validateSync(link);
    console.log('валидация прошла', link);
    return null;
  } catch (e) {
    console.log('валидация не прошла', link);
    return e.message;
  }
};
