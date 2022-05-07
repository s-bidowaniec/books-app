/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

const selectors = {
  'books': {
    'template': '#template-book',
    'books': '.books-list',
  },
  'forms': {
    'filters': '.filters'
  },
};

const  favoriteBooks = [];
const filters = [];

const addBooks = (books) => {
  const bookTemplate = Handlebars.compile(document.querySelector(selectors.books.template).innerHTML);
  const bookListDOM = document.querySelector('.books-list');
  for (const book of books){
    const bookHTML = bookTemplate(book);
    const bookDiv = utils.createDOMFromHTML(bookHTML);
    bookListDOM.appendChild(bookDiv);
  }
};

const initActions = () => {
  const domBooks = document.querySelector(selectors.books.books);

  domBooks.addEventListener('click', (e)=>{e.preventDefault();});

  domBooks.addEventListener('dblclick', (event)=>{
    event.preventDefault();
    const thisBook = event.target.parentElement.parentElement;
    if (thisBook.classList.contains('book__image')) {
      thisBook.classList.contains('favorite') ? thisBook.classList.remove('favorite') : thisBook.classList.add('favorite');
      favoriteBooks.includes(thisBook.dataset.id) ? favoriteBooks.splice(favoriteBooks.indexOf(thisBook.dataset.id), 1) : favoriteBooks.push(thisBook.dataset.id);
      console.log(favoriteBooks);
    }
  });

  const domFilters = document.querySelector(selectors.forms.filters);
  domFilters.addEventListener('click', (event)=>{
    const clickedElement = event.target;
    if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
      clickedElement.checked ? filters.push(clickedElement.value) : filters.splice(filters.indexOf(clickedElement.value), 1);
      console.log(filters);
    }
  });
};

addBooks(dataSource.books);
initActions();