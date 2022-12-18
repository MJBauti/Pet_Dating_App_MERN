import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      dogName
      gender
      breed
      birthday
      
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      _id
      body
      createdAt
      email
      likeCount
      likes {
        email
      }
      commentCount
      comments {
        _id
        email
        createdAt
        body
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  {
    getPosts {
      id
      body
      createdAt
      email
      likeCount
      likes {
        email
      }
      commentCount
      comments {
        id
        email
        createdAt
        body
      }
    }
  }
`;