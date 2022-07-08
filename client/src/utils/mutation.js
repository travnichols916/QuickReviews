import { gql } from '@apollo/client';

export const ADD_USER = gql `
mutation addUser ($username: String!, $email: String!, $password: String!) 
{
  addUser(username: $username, email:$email, password:$password) {
    token
    user {
      username
    }
  }
}
`

export const LOGIN = gql `
mutation login ($email: String!, $password: String!)
{
  login(email: $email, password: $password){
    token
    user{email, password}
  }
};
`
// SAVE_PRODUCT Missing
export const REMOVE_PRODUCT = gql `

mutation RemoveProduct($productId: ID!) {
  removeProduct(productId: $productId) {
    _id
    username
  }
}
`