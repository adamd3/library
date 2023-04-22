const newBookButton = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');
const addBookModal = document.getElementById('add-book-modal');
const closeBtn = document.querySelector('.close');

function showForm() {
  addBookModal.style.display = 'block';
}

function hideForm() {
  addBookModal.style.display = 'none';
}

newBookButton.onclick = () => {
  showForm();
};

closeBtn.onclick = () => {
  hideForm();
};

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook(event);
  hideForm();
});

window.onclick = function (event) {
  if (event.target == addBookModal) {
    addBookModal.style.display = 'none';
  }
};

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    displayBooks();
  }

  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);
    if (index > -1) {
      this.books.splice(index, 1);
      displayBooks();
    }
  }

  toggleRead() {
    this.read = !this.read;
  }

  getAllBooks() {
    return this.books;
  }
}

const library = new Library();

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function getBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
}

const addBook = (event) => {
  event.preventDefault();
  try {
    const newBook = getBook();
    library.addBook(newBook);
    document.getElementById('book-form').reset();
  } catch (error) {
    alert(error.message);
  }
};

const createBookDiv = (book) => {
  const bookContainer = document.getElementById('book-container');
  const bookCard = document.createElement('div');
  const buttonContainer = document.createElement('div');
  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('p');
  const bookPages = document.createElement('p');
  const readButton = document.createElement('button');
  bookCard.classList.add('book-card');
  buttonContainer.classList.add('button-container');
  bookTitle.textContent = book.title;
  bookAuthor.textContent = `by ${book.author}`;
  bookPages.textContent = `${book.pages} pages`;
  if (book.read) {
    readButton.classList.remove('unread');
    readButton.classList.add('read');
    readButton.textContent = 'Read';
  } else {
    readButton.classList.remove('read');
    readButton.classList.add('unread');
    readButton.textContent = 'Unread';
  }
  readButton.addEventListener('click', () => {
    book.toggleRead();
    if (book.read) {
      readButton.classList.remove('unread');
      readButton.classList.add('read');
      readButton.textContent = 'Read';
    } else {
      readButton.classList.remove('read');
      readButton.classList.add('unread');
      readButton.textContent = 'Unread';
    }
    // displayBooks();
  });
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    removeBook(book.title);
  });
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);
  bookCard.appendChild(buttonContainer);
  bookContainer.appendChild(bookCard);
};

const removeBook = (title) => {
  library.removeBook(title);
};

function displayBooks() {
  const books = library.getAllBooks();
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';
  for (const book of books) {
    createBookDiv(book);
  }
}

displayBooks();
