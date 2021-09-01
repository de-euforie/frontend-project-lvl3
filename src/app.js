import i18n from 'i18next';
import { setLocale } from 'yup';
import startView from './view.js';
import update from './updater.js';
import ru from './locales/ru.js';
import { handleSubmit } from './handlers.js';
import addText from './addtext.js';

// import en from './locales/en.js';

export default () => {
  const state = {
    form: {
      state: '',
      error: null,
    },
    feeds: [],
    posts: [],
    visitedPosts: [],
  };

  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'en',
    debug: true,
    resources: { ru },
  }).then(() => setLocale({
    mixed: {
      notOneOf: i18nInstance.t('errors.notOneOf'),
      required: i18nInstance.t('errors.required'),
    },
    string: {
      url: i18nInstance.t('errors.url'),
    },
  }));

  addText(i18nInstance);

  const watchedState = startView(state, i18nInstance);

  const rssForm = document.querySelector('.rss-form');

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(e, watchedState, i18nInstance);
  });

  // update(state);
};
