import onChange from 'on-change';
import { renderFeeds, renderPosts, renderStateForm } from './render.js';

export default (state) => onChange(state, (path, value) => {
  console.log('что-то изменилось, а именно:', path, value);
  switch (path) {
    case 'form.state':
      renderStateForm(value, state);
      break;
    case 'feeds':
      renderFeeds(state);
      break;
    case 'posts':
      renderPosts(state);
      break;
    default:
      break;
  }
});
