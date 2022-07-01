const { gql } = require('apollo-server-express');

const typeDefs = gql
`
type User {
    _id: ID
    username: String
    email: String
    password: String
    productCount: Int
    savedProducts: [Product]
    reviews: [Review]
  }
type Product {
    productId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
    reviews: [Review]
  }
type Review {
    _id: ID
    userId: 
    reviewText: String
    rating:
    recommend: Bolean
    dateCreated: 
}
type Auth {
    token: ID!
    user: User
}



type Query {
    me: User
    user:(username: String!): User
    users: [User]
    product: (_id: String!): Product
    products: [Product]


}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
    addReview(reviewText: String) : Review
    updateReview(reviewId: ID!): Review
    deleteReview(reviewid: ID!): Review
}
`

// missing user Id in Reviews