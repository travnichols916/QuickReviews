export const getSearchedBookIds = () => {
  const SearchedBookIds = localStorage.getItem('resultsData')
    ? JSON.parse(localStorage.getItem('resultsData'))
    : [];

  return SearchedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('resultsData', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('resultsData');
  }
};

export const saveSelectBook = (book) => {
  if (book) {
    localStorage.setItem('selectedBook', JSON.stringify(book));
  } else {
    localStorage.removeItem('selectedBook');
  }
}

export const getSelectBook = () => {
  const selectBook = localStorage.getItem('selectedBook')
    ? JSON.parse(localStorage.getItem('selectedBook'))
    : {};

  return selectBook;
}