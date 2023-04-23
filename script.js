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

const library = (() => {
  const libraryInstance = new Library();
  return {
    addBook: (book) => libraryInstance.addBook(book),
    removeBook: (title) => libraryInstance.removeBook(title),
    getAllBooks: () => libraryInstance.getAllBooks(),
  };
})();

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

const handleFormSubmit = (event) => {
  event.preventDefault();
  addBook(event);
  hideForm();
};

bookForm.addEventListener('submit', handleFormSubmit);

window.onclick = function (event) {
  if (event.target == addBookModal) {
    addBookModal.style.display = 'none';
  }
};

const getBook = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
};

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

const createBookTitle = (book) => {
  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;
  return bookTitle;
};

const createBookAuthor = (book) => {
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `by ${book.author}`;
  return bookAuthor;
};

const createBookPages = (book) => {
  const bookPages = document.createElement('p');
  bookPages.textContent = `${book.pages} pages`;
  return bookPages;
};

const createReadButton = (book) => {
  const readButton = document.createElement('button');
  readButton.addEventListener('click', () => {
    book.toggleRead();
  });
  updateReadButton(book, readButton);
  return readButton;
};

const updateReadButton = (book, readButton) => {
  if (book.read) {
    readButton.classList.remove('btn-unread');
    readButton.classList.add('btn-read');
    readButton.textContent = 'Read';
  } else {
    readButton.classList.remove('btn-read');
    readButton.classList.add('btn-unread');
    readButton.textContent = 'Unread';
  }
};

function createRemoveButton(book) {
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn-remove');
  removeButton.textContent = 'Remove';

  removeButton.addEventListener('click', () => {
    library.removeBook(book.title);
  });

  return removeButton;
}

const createBookDiv = (book) => {
  const bookContainer = document.getElementById('book-container');
  const bookCard = document.createElement('div');
  const bookTitle = createBookTitle(book);
  const bookAuthor = createBookAuthor(book);
  const bookPages = createBookPages(book);
  const readButton = createReadButton(book);
  const removeButton = createRemoveButton(book);

  bookCard.classList.add('book-card');

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readButton);
  bookCard.appendChild(removeButton);

  bookContainer.appendChild(bookCard);
};

function displayBooks() {
  const books = library.getAllBooks();
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';
  for (const book of books) {
    createBookDiv(book);
  }
}
