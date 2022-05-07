/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

const addBooks = (books) => {
  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const bookListDOM = document.querySelector('.books-list');
  for (const book of books){
    const bookHTML = bookTemplate(book);
    const bookDiv = utils.createDOMFromHTML(bookHTML);
    bookListDOM.appendChild(bookDiv);
  }
};

addBooks(dataSource.books);