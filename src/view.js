import onChange from 'on-change';
import validate from './validate.js';

const rssForm = document.querySelector('.rss-form');
const submitButton = document.querySelector('button');
const feedbackDiv = document.querySelector('.feedback');
const input = document.querySelector('input');

const renderStateForm = (value, state) => {
  switch (value) {
    case 'filling':
      feedbackDiv.textContent = '';
      break;
    case 'failed':
      feedbackDiv.textContent = state.form.error;
      feedbackDiv.classList.add('text-danger');
      feedbackDiv.classList.remove('text-success');
      input.classList.add('is-invalid');
      break;
    case 'success':
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

export default (state) => onChange(state, (path, value) => {
  console.log(path, value);
  switch (path) {
    case 'form.state':
      renderStateForm(value, state);
      break;
    case 'feeds':
      break;
    case 'posts':
      break;
    default:
      break;
  }
});
