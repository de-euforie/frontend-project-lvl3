import _ from 'lodash';
import addModal from './modal.js';

const rssForm = document.querySelector('.rss-form');
const submitButton = document.querySelector('#submitButton');
const feedbackDiv = document.querySelector('.feedback');
const input = document.querySelector('input');
const feedsDiv = document.querySelector('.feeds');
const postsDiv = document.querySelector('.posts');

export const renderStateForm = (value, state) => {
  switch (value) {
    case 'filling':
      submitButton.disabled = false;
      feedbackDiv.textContent = '';
      break;
    case 'loading':
      submitButton.disabled = true;
      break;
    case 'failed':
      submitButton.disabled = false;
      feedbackDiv.textContent = state.form.error;
      feedbackDiv.classList.add('text-danger');
      feedbackDiv.classList.remove('text-success');
      input.classList.add('is-invalid');
      break;
    case 'success':
      submitButton.disabled = false;
      rssForm.reset();
      feedbackDiv.textContent = 'RSS loaded successfully';
      feedbackDiv.classList.remove('text-danger');
      feedbackDiv.classList.add('text-success');
      input.classList.remove('is-invalid');
      break;
    default:
      break;
  }
};

export const renderPosts = (state, handler, i18nInstance) => {
  console.log('начало renderPosts');
  postsDiv.textContent = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class="card-title h4">${i18nInstance.t('interface.posts')}</h2>`;

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.posts.forEach((post) => {
    const { title, url, id } = post;
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('data-id', id);
    const aClass = _.has(state.visitedPosts, url) ? 'fw-normal' : 'fw-bold';
    a.classList.add(aClass);
    a.textContent = title;
    a.addEventListener('click', () => {
      handler(state, url);
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal');
    });

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary');
    button.setAttribute('data-id', id);
    button.textContent = i18nInstance.t('interface.view');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('тут вот стэйт', state);
      addModal(e.target, state);
    });

    li.append(a);
    li.append(button);

    ul.append(li);
  });

  card.append(cardBody);
  card.append(ul);
  postsDiv.append(card);
  console.log('конец renderPosts');
};

export const renderFeeds = (state, i18nInstance) => {
  console.log('начало renderFeeds');
  feedsDiv.textContent = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class="card-title h4">${i18nInstance.t('interface.feeds')}</h2>`;

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.feeds.forEach((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    li.innerHTML = `<h3 class="h6 m-0">${title}</h3><p class="m-0 small text-black-50">${description}</p>`;
    ul.append(li);
  });

  card.append(cardBody);
  card.append(ul);
  feedsDiv.append(card);
  console.log('конец renderFeeds');
};
