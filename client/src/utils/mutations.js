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

export const ADD_DOG = gql`
  mutation addDog(
    $dogName: String!
    $profilePicture: String!
    $pictures: String!
    $gender: String!
    $breed: String!
    $birthday: String!
    $preferences: Array
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

// export const ADD_ORDER = gql`
//   mutation addOrder($products: [ID]!) {
//     addOrder(products: $products) {
//       purchaseDate
//       products {
//         _id
//         name
//         description
//         price
//         quantity
//         category {
//           name
//         }
//       }
//     }
//   }
// `;
