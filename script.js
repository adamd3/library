const myLibrary = [];

function showForm() {
  document.getElementById('form-container').style.display = 'block';
}

function hideForm() {
  document.getElementById('form-container').style.display = 'none';
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
  event.preventDefault();
  const newBook = getBook();
  myLibrary.push(newBook);
  document.getElementById('book-form').reset();
  hideForm();
  displayBooks();
}

function removeBook(title) {}

function displayBooks() {
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';
  for (const book of myLibrary) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `by ${book.author}`;
    const bookPages = document.createElement('p');
    bookPages.textContent = `${book.pages} pages`;
    const bookRead = document.createElement('p');
    if (book.read) {
      bookRead.textContent = 'Read';
    } else {
      bookRead.textContent = 'Unread';
    }
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      const index = myLibrary.indexOf(book);
      if (index > -1) {
        myLibrary.splice(index, 1);
      }
      displayBooks();
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
