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