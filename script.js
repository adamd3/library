const myLibrary = [];

const newBookButton = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');
const formContainer = document.getElementById('form-container');
const bookContainer = document.getElementById('book-container');

newBookButton.addEventListener('click', showForm);

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
  bookForm.reset();
  hideForm();
  displayBooks();
});

function showForm() {
  formContainer.style.display = 'block';
}

function hideForm() {
  formContainer.style.display = 'none';
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function getBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
}

function addBook() {
  const newBook = getBook();
  myLibrary.push(newBook);
}

function removeBook(title) {
  const index = myLibrary.findIndex((book) => book.title === title);
  if (index > -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function displayBooks() {
  bookContainer.innerHTML = '';
  for (const book of myLibrary) {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    bookCard.classList.add('book-card');
    bookTitle.textContent = book.title;
    bookAuthor.textContent = `by ${book.author}`;
    bookPages.textContent = `${book.pages} pages`;
    if (book.read) {
      bookRead.textContent = 'Read';
    } else {
      bookRead.textContent = 'Unread';
    }
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(book.title);
    });
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(removeButton);
    bookContainer.appendChild(bookCard);
  }
}

displayBooks();
