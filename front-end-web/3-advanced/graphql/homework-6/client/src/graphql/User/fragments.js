import gql from "graphql-tag";

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    username
    email
    events {
      id
      title
      desc
      date
      participants {
        id
        user {
          id
          username
          email
        }
      }
    }
  }
`;
