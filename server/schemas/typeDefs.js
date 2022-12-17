// gql imported
const { gql } = require('apollo-server-express');

// TODO: Query, User, and other. 
    // TODO: Rest of 'Mutation'
const typeDefs = gql`

    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        dogName: String!
        gender: String!
        breed: String!
        birthday: String!
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(
            firstName: String, 
            lastName: String, 
            email: String!, 
            password: String!, 
            dogName: String,
            gender: String,
            breed: String,
            birthday: String): Auth
        updateUser(
            firstName: String, 
            lastName: String, 
            email: String, 
            dogName: String, 
            gender: String, 
            breed: String, 
            birthday: String): User
        
    }
`;

module.exports = typeDefs;