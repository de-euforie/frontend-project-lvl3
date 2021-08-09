import _ from 'lodash';

export default (button, state) => {
  document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
  document.body.classList.add('.modal-open');
  const postId = button.dataset.id;

  const { title, description, url } = state.posts.find(({ id }) => postId === id);

  const modal = document.querySelector('#modal');
  modal.classList.add('show');
  modal.setAttribute('aria-hiden', 'false');
  modal.setAttribute('style', 'display: block;');

  const modalTitle = modal.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modalBody = modal.querySelector('.modal-body');
  modalBody.textContent = description;

  state.visitedPosts.push(url);
  if (!_.has(state.visitedPosts, url)) {
    state.visitedPosts.push(url);
  }

  const a = document.querySelector(`[data-id='${postId}']`);
  a.classList.remove('fw-bold');
  a.classList.add('fw-normal');

  const fullArticleButton = modal.querySelector('.full-article');
  fullArticleButton.setAttribute('href', url);

  const fadeDiv = document.createElement('div');
  fadeDiv.classList.add('modal-backdrop', 'fade', 'show');
  document.body.append(fadeDiv);

  const closeModal = () => {
    document.body.setAttribute('style', '');
    document.body.classList.remove('.modal-open');
    modal.classList.remove('show');
    modal.setAttribute('aria-hiden', 'true');
    modal.setAttribute('style', 'display: none;');
    fadeDiv.remove();
  };

  const x = modal.querySelector('.btn-close');
  x.addEventListener('click', () => closeModal());

  const closingBtn = modal.querySelector('.btn-secondary');
  closingBtn.addEventListener('click', () => closeModal());
};
