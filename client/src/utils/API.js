// make a search to google books api

import { saveBookIds } from "./localStorage";

// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      console.log("items: ", data)
      const resultsData = data.items.map((product) => {
      const { id, volumeInfo } = product;
      const { authors, title, description, averageRating, imageLinks, industryIdentifiers } = volumeInfo;
      let isbn = "";
      if(industryIdentifiers.length > 0) {
        isbn = industryIdentifiers.filter(industryIdentifier => industryIdentifier.type === "ISBN_13")[0].identifier
      }

      return {
        bookId: id,
        authors: authors || ['No author to display'],
        title: title,
        description: description,
        averageRating: averageRating,
        image: imageLinks?.thumbnail || '',
        isbn: isbn
      }
    });

    console.log("resultsData", resultsData)
    saveBookIds(resultsData);
    })

  
};
