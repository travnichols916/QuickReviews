const { gql } = require('apollo-server-express');
const { model } = require('mongoose');

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
    # me: User
    # user:(username: String!): User
    # users: [User]
    # product: (_id: String!): Product
    # products: [Product]
}
type Mutation {
    # addUser(username: String!, email: String!, password: String!): Auth
    # login(email: String!, password: String!): Auth
    
    # saveProduct(title: String!, image: String!, link: String!, description: String!): User
    # removeProduct(_id: ID!): User

    # addReview(_id: ID!, reviewText: String) : User
    # updateReview(_id: ID!, reviewId: ID!): User
    # deleteReview(_id: ID!, reviewid: ID!): User
}
`;

//travis added this
module.exports = typeDefs;
// missing user Id in Reviews