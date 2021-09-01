import onChange from 'on-change';
import { renderFeeds, renderPosts, renderStateForm } from './render.js';
import { handleVisiting } from './handlers.js';

export default (state, i18nInstance) => onChange(state, (path, value) => {
  console.log('что-то изменилось, а именно:', path, value);
  switch (path) {
    case 'form.state':
      renderStateForm(value, state);
      break;
    case 'feeds':
      renderFeeds(state, i18nInstance);
      break;
    case 'posts':
      renderPosts(state, handleVisiting, i18nInstance);
      break;
    default:
      break;
  }
});
