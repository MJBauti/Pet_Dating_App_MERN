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

// export const ADD_DOG = gql`
//   mutation addDog(
//     $dogName: String!
//     $gender: String!
//     $breed: String!
//     $birthday: String!
//     $preferences: String
//   ) {
//     addDog(
//       dogName: $dogName
//       gender: $gender
//       breed: $breed
//       birthday: $birthday
//       preferences: $preferences
//     ) {
//       dogName
//       gender
//       breed
//       birthday
//     }
//   }
// `;

// export const UPDATE_DOG = gql`
//   mutation updateDog(
//     $dogName: String
//     $profilePicture: String
//     $pictures: String
//     $gender: String
//     $breed: String
//     $birthday: String
//     $preferences: String
//   ) {
//     updateDog(
//       dogName: $dogName
//       profilePicture: $profilePicture
//       pictures: $pictures
//       gender: $gender
//       breed: $breed
//       birthday: $birthday
//       preferences: $preferences
//     )
//   }
// `;