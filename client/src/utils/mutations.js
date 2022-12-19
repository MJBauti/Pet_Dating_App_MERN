import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $dogName: String!
    $gender: String!
    $breed: String!
    $birthday: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      dogName: $dogName
      gender: $gender
      breed: $breed
      birthday: $birthday
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $dogName: String
    $gender: String
    $breed: String
    $birthday: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      dogName: $dogName
      gender: $gender
      breed: $breed
      birthday: $birthday
    )  {
      _id
      birthday
      breed
      dogName
      email
      firstName
      gender
      lastName
    }
  }
`;



export const ADD_COMMENT = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        email
      }
      commentCount
    }
  }
`;

export const DELETE_POST = gql`
mutation deletePost($postId: ID!) {
  deletePost(postId: $postId)
}
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    id
    comments {
      id
      email
      createdAt
      body
    }
    commentCount
  }
}
`;

export const LIKE_POST = gql`
mutation likePost($postId: ID) {
  likePost(postId: $postId) {
    id
    likes {
      id
      email
    }
    likeCount
  }
}
`;

export const CREATE_POST = gql`
mutation createPost($body: String!) {
  createPost(body: $body) {
    id
    body
    createdAt
    email
    likes {
      id
      email
      createdAt
    }
    likeCount
    comments {
      id
      body
      email
      createdAt
    }
    commentCount
  }
}
`;