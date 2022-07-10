import { gql, useQuery } from '@apollo/client';

export const QUERY_ME = gql`
{
    me {
      _id
      username
      email
    }
  }
`;