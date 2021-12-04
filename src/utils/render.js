import AbstractView from '../view/abstract-view.js';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, element, place) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

const replace = (newItem, oldItem) => {
  if (newItem === null || oldItem === null) {
    throw new Error('Can\'t replace inexisting element');
  }

  const newChild = newItem instanceof AbstractView ? newItem.element : newItem;
  const oldChild = oldItem instanceof AbstractView ? oldItem.element : oldItem;
  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Element\'s parent doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export {RenderPosition, render, replace, createElement};
