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
        orders: [Order]
    }

    type Dog {
        _id: ID
        dogName: String!
        profilePicture: String!
        pictures: String!
        gender: String!
        breed: String!
        birthday: String!
        preferences: String
        petParent: [User]
    }

    type Category {
        _id: ID
        name: String
    }
    
      type Product {
        _id: ID
        name: String!
        description: String
        image: String
        quantity: Int
        price: Float!
        category: Category!
    }
    
      type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type Checkout {
        session: ID
    }
    
    type Auth {
        token: ID
        user: User
    }

    type Query {
        dog: [Dog]
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        login(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addDog(dogName: String!, profilePicture: String!, pictures: String!, gender: String!, breed: String!, birthday: String!, preferences: String): Dog
        addOrder(products: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateDog(_id: ID, dogName: String, profilePicture: String, pictures: String, gender: String, breed: String, birthday: String, preferences: String): Dog
        updateProduct(_id: ID!, quantity: Int!): Product
    }
`;

module.exports = typeDefs;