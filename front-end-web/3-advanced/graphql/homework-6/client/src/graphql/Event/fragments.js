import gql from "graphql-tag";

export const EventFragment = gql`
  fragment EventFragment on Event {
    id
    title
    desc
    date
    from
    to
    user {
      id
      username
      email
    }
    participants {
      id
      user {
        id
        username
        email
      }
    }
    location {
      id
      name
      desc
      lat
      lng
    }
  }
`;
