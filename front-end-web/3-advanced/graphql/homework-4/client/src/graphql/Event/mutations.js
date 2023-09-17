import { gql } from "@apollo/client";

export const addEvent = gql`
  mutation addEvent($eventInput: EventInput!) {
    addEvent(input: $eventInput) {
      id
      title
      desc
      date
    }
  }
`;

export const updateEvent = gql`
  mutation updateEvent($eventId: Int!, $eventInput: EventInput!) {
    updateEvent(id: $eventId, input: $eventInput) {
      id
      title
      desc
      date
    }
  }
`;

export const deleteEvent = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(id: $eventId) {
      id
      title
      desc
      date
    }
  }
`;

export const deleteAllEvents = gql`
  mutation deleteAllEvents {
    deleteAllEvents {
      count
    }
  }
`;
