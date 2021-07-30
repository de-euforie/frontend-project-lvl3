import _ from 'lodash';
import onChange from 'on-change';
import validate from './validate.js';

export default () => {
  const state = {
    process: 'filling',
    form: {
      isValid: false,
      link: '',
      error: ' '
    },
    feeds: [],
    posts: [],
  };
  
  const validateHandler = () => {
    state.form.isValid = validate(state.form.link, state.feeds);
    const { isValid } = state.form;
    watchedState.form.error = isValid ? ' ' : 'The link must be a valid URL';
    watchedState.process = isValid ? 'submitting' : 'filling'
  }

  const processStateHandler = (value) => {
    switch (value) {
      case 'validating':
        validateHandler();
        break;
      case 'submitting':
        watchedState.
        break;
      default:
        break;
    }
  }
  const errorHandler = () => {
    const feedbackDiv = document.querySelector('.feedback')
    feedbackDiv.textContent = state.form.error;
  }

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'process':
        processStateHandler(value);
        break;
      case 'form.error':
        errorHandler();
      default:
        break;
    }
  });

  const rssForm = document.querySelector('.rss-form');
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('link');
    state.form.link = link;
    watchedState.process = 'validating';
  });
};
