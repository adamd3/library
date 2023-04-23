const newBookButton = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');
const addBookModal = document.getElementById('add-book-modal');
const closeBtn = document.querySelector('.close');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
    displayBooks();
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

  getAllBooks() {
    return this.books;
  }
}

const library = new Library();

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
  const removeButton = document.createElement('button');

  bookCard.classList.add('book-card');
  removeButton.classList.add('btn-remove');

  bookTitle.textContent = book.title;
  bookAuthor.textContent = `by ${book.author}`;
  bookPages.textContent = `${book.pages} pages`;

  readButton.addEventListener('click', () => {
    book.toggleRead();
  });

  if (book.read) {
    readButton.classList.remove('btn-unread');
    readButton.classList.add('btn-read');
    readButton.textContent = 'Read';
  } else {
    readButton.classList.remove('btn-read');
    readButton.classList.add('btn-unread');
    readButton.textContent = 'Unread';
  }

  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    removeBook(book.title);
  });

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readButton);
  bookCard.appendChild(removeButton);
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
