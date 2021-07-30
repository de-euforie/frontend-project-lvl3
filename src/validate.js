import * as yup from 'yup';

const schema = yup.object().shape({
    link: yup.string().url(),
});

export default (link, feeds) => {
    const schema = yup.string().url().notOneOf(feeds);
    return schema.isValidSync(link);
};
