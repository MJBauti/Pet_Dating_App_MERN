// gql imported
const { gql } = require('apollo-server-express');

// TODO: Query, User, and other. 
    // TODO: Rest of 'Mutation'
const typeDefs = gql`

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth

`;

module.exports = typeDefs;