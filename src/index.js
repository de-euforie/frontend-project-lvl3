import _ from 'lodash';

const createForm = () => {
  const form = document.createElement('form');

  const div = document.createElement('div');
  div.classList.add('form-group');
  form.append(div);

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'RSS link');
  input.classList.add('form-control');

  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'add';

  div.append(input, button);

  return form;
}

document.body.appendChild(createForm());
