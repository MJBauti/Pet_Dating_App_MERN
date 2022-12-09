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
        pet: [Dog]
    }

    type Dog {
        _id: ID
        dogName: String!
        profilePicture: String!
        pictures: String!
        gender: String!
        breed: String!
        birthday: String!
        preferences: Array
        petParent: [User]
    }

    type Mutation {
        login(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addDog(dogName: String!, profilePicture: String!, pictures: String!, gender: String!, breed: String!, birthday: String!, preferences: Array): Dog
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateDog(dogName: String, profilePicture: String, pictures: String, gender: String, breed: String, birthday: String, preferences: Array): Dog
`;

module.exports = typeDefs;