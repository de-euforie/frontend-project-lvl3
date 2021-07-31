import axios from 'axios';
import _ from 'lodash';
import validate from './validate.js';

const parseRss = (rss, url) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(rss, 'application/xml');

  const titleElement = dom.querySelector('title');
  const title = titleElement.textContent;
  const descriptionElement = dom.querySelector('description');
  const description = descriptionElement.textContent;
  const feed = {
    id: _.uniqueId(), title, description, url,
  };

  return { feed };
};

const getRss = (url, watchedState) => {
  const urlForRequest = `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;
  axios.get(urlForRequest)
    .catch((e) => {
      console.log('noooo');
    })
    .then((response) => {
      const { feed } = parseRss(response.data.contents, url);
      watchedState.feeds.push(feed);
      watchedState.form.state = 'success';
      console.log('bbb', feed);
    });
};

export const handleSubmit = (e, watchedState) => {
  const formData = new FormData(e.target);
  const url = formData.get('url');

  watchedState.form.error = validate(url, watchedState.feeds);

  if (watchedState.form.error) {
    watchedState.form.state = 'failed';
  } else {
    getRss(url, watchedState);
  }
};
