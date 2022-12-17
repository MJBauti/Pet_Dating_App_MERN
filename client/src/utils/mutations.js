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
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
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
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_DOG = gql`
  mutation addDog(
    $dogName: String
    $profilePicture: String
    $pictures: String
    $gender: String
    $breed: String
    $birthday: String
    $preferences: String
  ) {
    addDog(
      dogName: $dogName
      profilePicture: $profilePicture
      pictures: $pictures
      gender: $gender
      breed: $breed
      birthday: $birthday
      preferences: $preferences
    )
  }
`;

export const UPDATE_DOG = gql`
  mutation updateDog(
    $dogName: String
    $profilePicture: String
    $pictures: String
    $gender: String
    $breed: String
    $birthday: String
    $preferences: String
  ) {
    updateDog(
      dogName: $dogName
      profilePicture: $profilePicture
      pictures: $pictures
      gender: $gender
      breed: $breed
      birthday: $birthday
      preferences: $preferences
    )
  }
`;