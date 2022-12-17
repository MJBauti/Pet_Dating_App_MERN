import { gql } from '@apollo/client';

// export const QUERY_DOGS = gql`
//     query getDogs($user: ID) {
//         dogs(user: $user) {
//             _id
//             dogName
//             profilePicture
//             pictures
//             gender
//             breed
//             birthday
//             preferences
//             petParent {
//                 _id
//                 firstName
//                 lastName
//             }
//         }
//     }
// `;

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

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