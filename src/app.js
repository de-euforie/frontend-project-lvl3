import _ from 'lodash';
import startView from './view.js';
import receiveError from './validate.js';

export default () => {
  const state = {
    form: {
      state: '',
      error: ' ',
    },
    feeds: [],
    posts: [],
  };

  const watchedState = startView(state);

  /* const validateHandler = () => {
    state.form.isValid = validate(state.form.link, state.feeds);
    const { isValid } = state.form;
    watchedState.form.error = isValid ? ' ' : 'The link must be a valid URL';
    watchedState.process = isValid ? 'submitting' : 'filling'
  }

  const errorHandler = () => {
    const feedbackDiv = document.querySelector('.feedback')
    feedbackDiv.textContent = state.form.error;
  }
  }); */

  const rssForm = document.querySelector('.rss-form');

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('link');

    state.form.error = receiveError(link, state.feeds);

    // console.log(link, isValid);
    if (state.form.error === '') {
      watchedState.feeds.push(link);
      watchedState.form.state = 'success';
    } else {
      watchedState.form.state = 'failed';
    }
  });
};
