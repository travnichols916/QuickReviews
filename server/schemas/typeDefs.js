const { gql } = require('apollo-server-express');

const typeDefs = gql
`
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }


type Query {
    me: User

}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!, image: String!, link: String!): 
    removeBook(bookId: ID!): User
}
`
