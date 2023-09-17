import { gql } from "@apollo/client";
import { EventFragment } from "graphql/Event/fragments";

export const addEvent = gql`
  mutation addEvent($eventInput: EventInput!) {
    addEvent(input: $eventInput) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const updateEvent = gql`
  mutation updateEvent($eventId: Int!, $eventInput: EventInput!) {
    updateEvent(id: $eventId, input: $eventInput) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const deleteEvent = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(id: $eventId) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const deleteAllEvents = gql`
  mutation deleteAllEvents {
    deleteAllEvents {
      count
    }
  }
`;
