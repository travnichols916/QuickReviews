import { gql } from '@apollo/client';

export const QUERY_ME = gql `
{
    me {
      _id
      username
      email
      reviews {
      _id
      productIsbn
      productTitle
      reviewTitle
      userId
      reviewText
      rating
      recommended
      dateCreated
    }
  }
}
`;

export const USER_QUERY = gql `
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    password
    productCount
    savedProducts {
      _id
      title
      authors
      description
      image
      link
      reviews {
        _id
        productIsbn
        productTitle
        reviewTitle
        userId
        reviewText
        rating
        recommended
        dateCreated
      }
    }
  }
}
`;

export const REVIEW_BY_ISBN = gql `
query ReviewsByIsbn( $productIsbn: String! ) {
  reviewsByIsbn(productIsbn: $productIsbn) {
    _id
    productIsbn
    productTitle
    reviewTitle
    userId
    reviewText
    rating
    recommended
    dateCreated
  }
}
`;

