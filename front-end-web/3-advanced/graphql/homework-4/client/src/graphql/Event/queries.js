import { gql } from "@apollo/client";

export const getEvents = gql`
  query getEvents {
    events {
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
  }
`;

export const getEvent = gql`
  query getEvent($eventId: Int!) {
    event(id: $eventId) {
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
  }
`;
