
let myLibrary = [
  {
    title: 'The Lord of The Rings',
    author: 'JRR Tolkien',
    pages: 1000,
    read: true,
  },
  {
    title: 'One Up Wallstreet',
    author: 'Peter Lynch',
    pages: 300,
    read: true,
  },
  {
    title: 'Sapiens',
    author: 'Noah Yuval Harrari',
    pages: 400,
    read: false,
  }
];
// gather dom elements
const newBookBtn = document.getElementById("newbook");
const myModal = document.getElementById('modal');
// modal inputs:
const titleInput = document.querySelector(".modal-input-title");
const authorInput = document.querySelector(".modal-input-author");
const pagesInput = document.querySelector(".modal-input-pages");
const checkBoxInput = document.querySelector(".modal-input-check");
const cancelBtn = document.getElementById("cancel");
const addBtn = document.getElementById("add");
const form = document.querySelector('.book-form');
// list
const list = document.querySelector(".list");
// card buttons
const deleteBtn = document.getElementById('delete');

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.bookTitle.value !== "") {
    addBookToLibrary({
      title: event.target.bookTitle.value,
      author: event.target.bookAuthor.value,
      pages: event.target.bookPages.value,
      read: event.target.readBefore.value,
    });
    event.target.reset();
    closeModal();
  }
  return
});

function addBookToLibrary(bookObject) {
  myLibrary = [];
  myLibrary.push(bookObject);
  renderLibrary();
}

function createCard(element, className, text = null) {
  const domLi = document.createElement(element);
  domLi.classList.add(className);
  if (text !== null) domLi.innerText = text;
  return domLi;
}

function renderLibrary() {
  // myLibrary.innerText = '';

  myLibrary.forEach((book) => {
    const bookLi = createCard('li', 'list__item');
    // top of card
    const cardTop = createCard('div', 'list__card-top');
    const cardTitle = createCard('p', 'book__info', book.title);
    const cardAuthor = createCard('p', 'book__info', 'By: ' + book.author);
    const cardPages = createCard('p', 'book__info', book.pages + ' Pages');
    // bottom of card
    const cardBottom = createCard('div', 'list__card-bottom');
    const readBtn = createCard('button', 'btn', 'Read?');
    readBtn.setAttribute('id', 'read');
    const deleteBtn = createCard('button', 'btn', 'Delete');
    deleteBtn.setAttribute('id', 'delete');

    // appending it all together:
    cardTop.appendChild(cardTitle);
    cardTop.appendChild(cardAuthor);
    cardTop.appendChild(cardPages);
    cardBottom.appendChild(readBtn);
    cardBottom.appendChild(deleteBtn);
    bookLi.appendChild(cardTop);
    bookLi.appendChild(cardBottom);
    list.appendChild(bookLi);
  })
}

renderLibrary(myLibrary);

function closeModal() {
  myModal.style.display = "none";
}


