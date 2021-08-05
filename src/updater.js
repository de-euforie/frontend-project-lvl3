import axios from 'axios';
import parseRss from './parser.js';

const update = (state) => {
  const urls = state.feeds.map(({ url }) => url);
  let newPosts = [];
  const promises = urls.map((url) => axios.get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      const { posts } = parseRss(response.data.contents, url);
      console.log('получен рсс при обновлении', posts);
      newPosts = [...posts, ...newPosts];
    }));
  const promise = Promise.all(promises);
  promise.then(() => {
    console.log('Обновлено! новые посты', newPosts.flat());
    state.posts = newPosts;
    setTimeout(() => update(state), 5000);
  });
};

export default update;
