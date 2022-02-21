let myLibrary = [
  {
    title: 'The Lord of The Rings',
    author: 'JRR Tolkien',
    pages: 1000,
    read: true,
    bookId: 0,
  },
  {
    title: 'One Up Wallstreet',
    author: 'Peter Lynch',
    pages: 300,
    read: true,
    bookId: 1,
  },
  {
    title: 'Sapiens',
    author: 'Noah Yuval Harrari',
    pages: 400,
    read: false,
    bookId: 2,
  }
];

// gather dom elements
const newBookBtn = document.getElementById("newbook");
const myModal = document.getElementById('modal');
const titleInput = document.querySelector(".modal-input-title");
const authorInput = document.querySelector(".modal-input-author");
const pagesInput = document.querySelector(".modal-input-pages");
const checkBoxInput = document.querySelector(".modal-input-check");
const cancelBtn = document.getElementById("cancel");
const addBtn = document.getElementById("add");
const form = document.querySelector('.book-form');
const list = document.querySelector(".list");
const del = document.getElementById('delete');

// CONSTRUCTOR FUNCTION
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

function closeModal() {
  myModal.style.display = "none";
}

function renderLibrary() {
  myLibrary.forEach((book) => {
    const bookLi = createCard('li', 'list__item');
    // top of card
    const cardTop = createCard('div', 'list__card-top');
    const cardTitle = createCard('p', 'book__info', book.title);
    const cardAuthor = createCard('p', 'book__info', 'By: ' + book.author);
    const cardPages = createCard('p', 'book__info', book.pages + ' Pages');
    const cardStatus = createCard('p', 'book__info', showStatus());
    // bottom of card
    const cardBottom = createCard('div', 'list__card-bottom');
    // toggle switch
    const toggle = createCard('label', 'switch');
    const switchInput = createCard('input', 'switch__checkbox');
    switchInput.setAttribute('type', 'checkbox');
    const switchSpan = createCard('span', 'slider');
    switchSpan.classList.add('round');

    const deleteBtn = createCard('a', 'btn', 'Delete');
    deleteBtn.setAttribute('type', 'submit');
    deleteBtn.setAttribute('id', 'delete');

    // appending it all together:
    cardTop.appendChild(cardTitle);
    cardTop.appendChild(cardAuthor);
    cardTop.appendChild(cardPages);
    cardTop.appendChild(cardStatus);

    toggle.appendChild(switchInput);
    toggle.appendChild(switchSpan);
    cardBottom.appendChild(toggle);

    cardBottom.appendChild(deleteBtn);
    bookLi.appendChild(cardTop);
    bookLi.appendChild(cardBottom);
    list.appendChild(bookLi);

    deleteBtn.addEventListener('click', event => {
      let b = event.target;
      let cardInner = b.parentElement;
      let wholeCard = cardInner.parentElement;

      wholeCard.parentElement.removeChild(wholeCard);
    })

    function showStatus() {
      if (book.read === true) {
        return "\u2705 " + "Read";
      }
      return "\u274C " + "Not Read";
    }

    switchInput.addEventListener('change', event => {
      if (switchInput.checked) {
        cardStatus.innerText = "\u2705 " + "Read";
      } else {
        cardStatus.innerText = "\u274C " + "Not Read";
      }
    })
  })
}

renderLibrary(myLibrary);
