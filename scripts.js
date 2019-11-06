const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    setEventListeners();
  }

  // Set default event listeners
  function setEventListeners() {
    // Select all item__text
    const itemTextArr = document.querySelectorAll('.item__text');

    // Add event listeners to all items
    for (let i = 0; i < itemTextArr.length; i++) {
      itemTextArr[i].addEventListener('click', edit);
    }

    // Select all buttons in item__button
    const buttonsArr = document.querySelectorAll('.item__button');

    // Add event listeners to all buttons
    for (let i = 0; i < buttonsArr.length; i++) {
      buttonsArr[i].addEventListener('click', deleteItem);
    }

    // Select all checkboxes in item__checkbox
    const checkboxArr = document.querySelectorAll('.item__checkbox');

    // Add event listeners to all checkboxes
    for (let i = 0; i < checkboxArr.length; i++) {
      checkboxArr[i].addEventListener('change', finish);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    const formElement = e.target;
    const inputElement = formElement.children[0];
    const value = inputElement.value;

    // Check if input is empty or contains only whitespaces
    if (/\S/.test(value) && value) {
      // Create new list item and set at bottom of list
      add(value);
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const checkboxElement = e.target;

    // If checkbox is checked
    if (this.checked === true) {
      checkboxElement.parentElement.classList.add('item--done');
    } else {
      checkboxElement.parentElement.classList.remove('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    // Item text element
    const itemTextElement = e.target;
    const orginalText = itemTextElement.innerHTML;

    // Create new input element
    const inputElement = createElement('input', 'form__input');
    // Add style to input element
    inputElement.style.width = '100%';
    // Add text as value
    inputElement.setAttribute('value', orginalText)
    // Add keydown event to input element
    inputElement.addEventListener('keydown', commit)
    // Insert new input element before itemTextElement
    itemTextElement.parentNode.insertBefore(inputElement, itemTextElement.nextSibling);
    // Hide itemTextElement
    itemTextElement.style.display = 'none';
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    // When enter is pressed
    if (e.keyCode === ENTER_KEYCODE) {
      const inputElement = e.target;
      const inputValue = inputElement.value;
      const itemTextElement = inputElement.previousSibling;
      // Unhide and update HMTL in itemTextElement
      itemTextElement.style.display = 'block';
      itemTextElement.innerHTML = inputValue;
      // Delete input element
      inputElement.remove();
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    // Create list elements
    const liElement = createElement('li', 'item');
    const inputCheckboxElement = createElement('input', 'item__checkbox', null, 'checkbox');
    const itemTextElement = createElement('span', 'item__text')
    const buttonElement = createElement('button', 'item__button');

    // Add correct values and event listeners
    buttonElement.innerHTML = 'Eyða';
    itemTextElement.innerHTML = value;
    inputCheckboxElement.addEventListener('change', finish);
    itemTextElement.addEventListener('click', edit);
    buttonElement.addEventListener('click', deleteItem);

    // Add elements to parent element li
    liElement.appendChild(inputCheckboxElement);
    liElement.appendChild(itemTextElement);
    liElement.appendChild(buttonElement);

    // Add elements to parent element ul
    items.appendChild(liElement)
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const buttonElement = e.target;
    buttonElement.parentElement.remove();
  }

  // hjálparfall til að útbúa element
  function createElement(tag, className, clickHandler, type) {
    const newEl = document.createElement(tag);

    if (className) {
      newEl.classList.add(className);
    }

    if (clickHandler) {
      newEl.addEventListener('click', clickHandler);
    }

    if (type) {
      newEl.setAttribute('type', type)
    }

    return newEl;
  }

  return {
    init: init
  }
})();
