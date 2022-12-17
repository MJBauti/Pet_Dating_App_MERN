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
// followers
//       following