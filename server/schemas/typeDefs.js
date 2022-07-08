const { gql } = require('apollo-server-express');


const typeDefs = gql`
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
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
    reviews: [Review]
  }

type Review {
    _id: ID
    userId: ID
    reviewText: String
    rating: Float
    recommend: Boolean
    dateCreated: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    user(username: String!): User
    users: [User]
    product(_id: String!): Product
    products: [Product]
    reviews: [Review]
    review(_id: String!): Review
}

type Mutation {
     addUser(username: String!, email: String!, password: String!): Auth
     login(email: String!, password: String!): Auth
    
     saveProduct(title: String!, image: String!, link: String!, description: String!): User
     removeProduct(productId: ID!): User 

      addReview(productId: ID!, reviewText: String!, rating: String!, recommended: Boolean!) : User
      updateReview(productId: ID!, reviewId: ID!): User
      deleteReview(productId: ID!, reviewid: ID!): User
 }
`;


module.exports = typeDefs;
// missing user Id in Reviews