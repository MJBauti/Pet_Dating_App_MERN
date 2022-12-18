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
        dogName: String
        gender: String
        breed: String
        birthday: String
    }

    type Post {
        id: ID
        body: String
        createdAt: String
        email: String
        comments: [Comment]
        likes: [Like]
        likeCount: Int
        commentCount: Int
    }

    type Comment {
        id: ID
        createdAt: String
        email: String
        body: String
    }

    type Like {
        id: ID
        createdAt: String
        email: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        getPosts: [Post]
        getPost(postId: ID): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(
            firstName: String!, 
            lastName: String!, 
            email: String!, 
            password: String!, 
            dogName: String!,
            gender: String!,
            breed: String!,
            birthday: String!): Auth
        updateUser(
            firstName: String, 
            lastName: String, 
            email: String, 
            dogName: String, 
            gender: String, 
            breed: String, 
            birthday: String): User

        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID, commentId: ID): Post!
        likePost(postId: ID): Post!
    }
    type Subscription {
        newPost: Post!
    }
`;
// follow(
//     followingId: ID!):Follow
// unfollow(
//     followId: ID): Boolean
// followers: [Follow]
//         following: [Follow]

// type Follow {
//     id: ID!
//     follower: User!
//     following: User!
// }

module.exports = typeDefs;