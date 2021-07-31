import _ from 'lodash';
import i18n from 'i18next';
import { setLocale } from 'yup';
import startView from './view.js';
import validate from './validate.js';
import en from './locales/en.js';

export default () => {
  const state = {
    form: {
      state: '',
      error: null,
    },
    feeds: [],
    posts: [],
  };

  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'en',
    debug: true,
    resources: { en },
  }).then(() => setLocale({
    mixed: {
      notOneOf: i18nInstance.t('validation.notOneOf'),
      required: i18nInstance.t('validation.required'),
    },
    string: {
      url: i18nInstance.t('validation.url'),
    },
  }));

  const watchedState = startView(state);

  const rssForm = document.querySelector('.rss-form');

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('link');

    state.form.error = validate(link, state.feeds);
    console.log(state.form.error);
    if (!state.form.error) {
      watchedState.feeds.push(link);
      watchedState.form.state = 'success';
    } else {
      watchedState.form.state = 'failed';
    }
  });
};
