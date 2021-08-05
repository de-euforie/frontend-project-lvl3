import _ from 'lodash';

export default (rss, url) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(rss, 'application/xml');

  const titleElement = dom.querySelector('title');
  const title = titleElement.textContent;
  const descriptionElement = dom.querySelector('description');
  const description = descriptionElement.textContent;
  const id = _.uniqueId();
  const feed = {
    id, title, description, url,
  };
  const items = dom.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const postTitle = item.querySelector('title');
    const postDescription = item.querySelector('description');
    const link = item.querySelector('link');
    posts.push({
      id: _.uniqueId(),
      feedId: id,
      title: postTitle.textContent,
      description: postDescription.textContent,
      url: link.textContent,
    });
  });
  return { feed, posts };
};
