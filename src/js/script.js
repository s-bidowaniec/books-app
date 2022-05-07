/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

const selectors = {
  'books': {
    'template': '#template-book',
    'container': '.books-list',
    'book': '.book',
    'image': '.book__image',
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

const filterBooks = ()=>{
  const domBooksContainer = document.querySelector(selectors.books.container);
  for (const book of dataSource.books){
    const domBook = domBooksContainer.querySelector(`[data-id="${book.id}"]`);
    filters.every((filter)=>!book.details[filter]) ? domBook.classList.remove('hidden') : domBook.classList.add('hidden');
  }
};

const initActions = () => {
  const domBooksContainer = document.querySelector(selectors.books.container);

  domBooksContainer.addEventListener('click', (e)=>{e.preventDefault();});

  domBooksContainer.addEventListener('dblclick', (event)=>{
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
      filterBooks();
    }
  });

};

const classifyRatings = () => {
  dataSource.books.forEach((book)=>{
    let gradients = '';
    if (book.rating < 6){
      gradients = 'to bottom,  #fefcea 0%, #f1da36 100%';
    } else if (book.rating > 6 && book.rating<=8){
      gradients = 'to bottom, #b4df5b 0%,#b4df5b 100%';
    } else if (book.rating > 9 && book.rating<=9){
      gradients = 'to bottom, #299a0b 0%, #299a0b 100%';
    } else {
      gradients = 'to bottom, #ff0084 0%,#ff0084 100%';
    }
    const ratingWidth = book.rating*10;

    book.style = `background: linear-gradient(${gradients}); width: ${ratingWidth}%`;
  });
};
classifyRatings();
addBooks(dataSource.books);
initActions();