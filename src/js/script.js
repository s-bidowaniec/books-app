/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

const selectors = {
  'books': {
    'template': '#template-book',
    'bookIMG': '.book__image',
    'books': '.books-list',
  }
};

const addBooks = (books) => {
  const bookTemplate = Handlebars.compile(document.querySelector(selectors.books.template).innerHTML);
  const bookListDOM = document.querySelector('.books-list');
  for (const book of books){
    const bookHTML = bookTemplate(book);
    const bookDiv = utils.createDOMFromHTML(bookHTML);
    bookListDOM.appendChild(bookDiv);
  }
};

const  favoriteBooks = [];

const initActions = () => {
  const domBooks = document.querySelector(selectors.books.books);

  domBooks.addEventListener('dblclick', function(event){
    event.preventDefault();
    const thisBook = event.target.parentElement.parentElement;
    if (thisBook.classList.contains('book__image')) {
      thisBook.classList.contains('favorite') ? thisBook.classList.remove('favorite') : thisBook.classList.add('favorite');
      favoriteBooks.includes(thisBook.dataset.id) ? favoriteBooks.splice(favoriteBooks.indexOf(thisBook.dataset.id), 1) : favoriteBooks.push(thisBook.dataset.id);
      console.log(favoriteBooks);
    }
  });
  domBooks.addEventListener('click', (e)=>{e.preventDefault();});

};

addBooks(dataSource.books);
initActions();