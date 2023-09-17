import gql from "graphql-tag";
import { UserFragment } from "graphql/User/fragments";

export const getUsers = gql`
  query getUsers {
    users {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const getUser = gql`
  query getUser($userId: Int!) {
    user(id: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
