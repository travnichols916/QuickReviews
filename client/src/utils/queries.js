import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
    me {
      _id
      username
      email
      password
      productCount
      reviews {
        _id
        isbn
        productTitle
        reviewTitle
        userId
        reviewText
        rating
        recommend
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
    review {
      _id
      productIsbn
      reviewTitle
      userId
      reviewText
      rating
      recommend
      dateCreated
    }
  }
}
`;

