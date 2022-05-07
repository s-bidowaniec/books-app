/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
'use strict';
{
  class BookList {
    constructor() {
      const thisBookList = this;

      thisBookList.dataSource = dataSource;  //global
      thisBookList.selectors = {
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
      thisBookList.settings = {
        'ratingColors': {
          'bad': ['#fefcea', '#f1da36'],
          'satisfying': ['#b4df5b', '#b4df5b'],
          'good': ['#299a0b', '#299a0b'],
          'excellent': ['#ff0084', '#ff0084'],
        }
      };
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.dom = {};

      thisBookList.getDomElements();
      thisBookList.classifyRatings();
      thisBookList.addBooks();
      thisBookList.initActions();
    }

    getDomElements() {
      const thisBookList = this;

      thisBookList.dom.bookTemplate = document.querySelector(thisBookList.selectors.books.template);
      thisBookList.dom.booksContainer = document.querySelector(thisBookList.selectors.books.container);
      thisBookList.dom.filters = document.querySelector(thisBookList.selectors.forms.filters);
    }

    classifyRatings() {
      const thisBookList = this;

      thisBookList.dataSource.books.forEach((book) => {
        let gradients = ['#ffffff', '#000000'];
        if (book.rating < 6) {
          gradients = thisBookList.settings.ratingColors.bad;
        } else if (book.rating > 6 && book.rating <= 8) {
          gradients = thisBookList.settings.ratingColors.satisfying;
        } else if (book.rating > 9 && book.rating <= 9) {
          gradients = thisBookList.settings.ratingColors.good;
        } else {
          gradients = thisBookList.settings.ratingColors.excellent;
        }
        const ratingWidth = book.rating * 10;

        book.style = `background: linear-gradient(to bottom,  ${gradients[0]} 0%, ${gradients[1]} 100%); width: ${ratingWidth}%`;
      });
    }

    addBooks() {
      const thisBookList = this;

      const bookTemplate = Handlebars.compile(thisBookList.dom.bookTemplate.innerHTML);
      for (const book of thisBookList.dataSource.books) {
        const bookHTML = bookTemplate(book);
        const bookDiv = utils.createDOMFromHTML(bookHTML);
        thisBookList.dom.booksContainer.appendChild(bookDiv);
      }
    }

    filterBooks() {
      const thisBookList = this;

      for (const book of thisBookList.dataSource.books) {
        const domBook = thisBookList.dom.booksContainer.querySelector(`[data-id="${book.id}"]`);
        thisBookList.filters.every((filter) => !book.details[filter]) ? domBook.classList.remove('hidden') : domBook.classList.add('hidden');
      }
    }

    initActions() {
      const thisBookList = this;

      thisBookList.dom.booksContainer.addEventListener('click', (e) => {
        e.preventDefault();
      });
      thisBookList.dom.booksContainer.addEventListener('dblclick', (event) => {
        event.preventDefault();
        const thisBook = event.target.parentElement.parentElement;
        if (thisBook.classList.contains('book__image')) {
          thisBook.classList.contains('favorite') ? thisBook.classList.remove('favorite') : thisBook.classList.add('favorite');
          const favoriteBooks = thisBookList.favoriteBooks;
          favoriteBooks.includes(thisBook.dataset.id) ? favoriteBooks.splice(favoriteBooks.indexOf(thisBook.dataset.id), 1) : favoriteBooks.push(thisBook.dataset.id);
          console.log('favoriteBooks: ', favoriteBooks);
        }
      });

      thisBookList.dom.filters.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
          clickedElement.checked ? thisBookList.filters.push(clickedElement.value) : thisBookList.filters.splice(thisBookList.filters.indexOf(clickedElement.value), 1);
          console.log('active books filters: ', thisBookList.filters);
          thisBookList.filterBooks();
        }
      });

    }
  }

  const app = new BookList(); // eslint-disable-line no-unused-vars
}