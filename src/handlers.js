import axios from 'axios';
import _ from 'lodash';
import validate from './validate.js';

const parseRss = (rss, url) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(rss, 'application/xml');

  try {
    const titleElement = dom.querySelector('title');
    const title = titleElement.textContent;
    const descriptionElement = dom.querySelector('description');
    const description = descriptionElement.textContent;
    const id = _.uniqueId()
    const feed = {
      id, title, description, url,
    };
    const items = dom.querySelectorAll('item');
    const posts = [];
    items.forEach((item) => {
      const postTitle = item.querySelector('title');
      const postDescription = item.querySelector('description');
      const link = item.querySelector('link');
      posts.push({
        id: _.uniqueId(),
        feedId: id,
        title: postTitle.textContent,
        description: postDescription.textContent,
        url: link.textContent,
      })
    })
    return { feed, posts };
  } catch (e) {
    console.log('ошибка parseRss',e.message);
  }
  
};

const getRss = (url, watchedState) => {
  const urlForRequest = `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;
  axios.get(urlForRequest)
    .catch((e) => {
      console.log('ошибка при запросе', e.message);
    })
    .then((response) => {
      const { feed, posts } = parseRss(response.data.contents, url);
      console.log('получен рсс', feed, posts);
      watchedState.feeds.push(feed);
      const oldPosts = watchedState.posts
      watchedState.posts = [...posts, ...oldPosts];
      watchedState.form.state = 'success';
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
