let books = JSON.parse(localStorage.getItem('books')) || [];

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function renderBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  books.forEach((book) => {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}

function createBookElement(book) {
  const bookItem = document.createElement('div');
  bookItem.setAttribute('data-bookid', book.id);
  bookItem.setAttribute('data-testid', 'bookItem');

  const bookTitle = document.createElement('h3');
  bookTitle.setAttribute('data-testid', 'bookItemTitle');
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.setAttribute('data-testid', 'bookItemAuthor');
  bookAuthor.textContent = `Penulis: ${book.author}`;

  const bookYear = document.createElement('p');
  bookYear.setAttribute('data-testid', 'bookItemYear');
  bookYear.textContent = `Tahun: ${book.year}`;

  const buttonsDiv = document.createElement('div');

  const completeButton = document.createElement('button');
  completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
  completeButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
  completeButton.onclick = () => toggleComplete(book.id);

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
  deleteButton.textContent = 'Hapus Buku';
  deleteButton.onclick = () => deleteBook(book.id);

  const editButton = document.createElement('button');
  editButton.setAttribute('data-testid', 'bookItemEditButton');
  editButton.textContent = 'Edit Buku';
  editButton.onclick = () => editBook(book.id);

  buttonsDiv.appendChild(completeButton);
  buttonsDiv.appendChild(deleteButton);
  buttonsDiv.appendChild(editButton);

  bookItem.appendChild(bookTitle);
  bookItem.appendChild(bookAuthor);
  bookItem.appendChild(bookYear);
  bookItem.appendChild(buttonsDiv);

  return bookItem;
}

function toggleComplete(bookId) {
  const book = books.find((book) => book.id == bookId);
  book.isComplete = !book.isComplete;
  saveBooks();
  renderBooks();
}

function deleteBook(bookId) {
  books = books.filter((book) => book.id != bookId);
  saveBooks();
  renderBooks();
}

function editBook(bookId) {
  const book = books.find((book) => book.id == bookId);
  const title = prompt('Edit judul buku:', book.title);
  const author = prompt('Edit penulis buku:', book.author);
  const year = prompt('Edit tahun rilis buku:', book.year);

  if (title && author && year) {
    book.title = title;
    book.author = author;
    book.year = parseInt(year);
    saveBooks();
    renderBooks();
  }
}

document.getElementById('bookForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  if (title && author && year) {
    const newBook = {
      id: new Date().getTime(),
      title,
      author,
      year,
      isComplete
    };

    books.push(newBook);
    saveBooks();
    renderBooks();

 
    document.getElementById('bookForm').reset();
  }
});

renderBooks();
