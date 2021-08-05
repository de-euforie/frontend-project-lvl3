import axios from 'axios';
import _ from 'lodash';
import validate from './validate.js';
import parseRss from './parser.js';

const getRss = (url, watchedState, i18nInstance) => {
  const urlForRequest = `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;
  axios.get(urlForRequest)
    .catch((e) => {
      watchedState.form.error = i18nInstance.t('errors.netError');
      watchedState.form.state = 'failed';
      console.log('ошибка при запросе', e.message);
    })
    .then((response) => {
      const { feed, posts } = parseRss(response.data.contents, url);
      console.log('получен рсс', feed, posts);
      watchedState.feeds.push(feed);
      const oldPosts = watchedState.posts;
      watchedState.posts = [...posts, ...oldPosts];
      watchedState.form.state = 'success';
    })
    .catch((e) => {
      watchedState.form.error = i18nInstance.t('errors.invalidRss');
      watchedState.form.state = 'failed';
      console.log('невалидный rss', e.message);
    });
};

export const handleSubmit = (e, watchedState, i18nInstance) => {
  watchedState.form.state = 'loading';

  const formData = new FormData(e.target);
  const url = formData.get('url');

  watchedState.form.error = validate(url, watchedState.feeds);
  console.log('мы провалидировали', url, watchedState.form.error);
  if (watchedState.form.error) {
    console.log('watchedState.form.error');
    watchedState.form.state = 'failed';
  } else {
    getRss(url, watchedState, i18nInstance);
  }
};
