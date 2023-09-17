import { gql } from "@apollo/client";
import { EventFragment } from "graphql/Event/fragments";

export const ADD_EVENT = gql`
  mutation addEvent($eventInput: EventInput!) {
    addEvent(input: $eventInput) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: Int!, $eventInput: EventInput!) {
    updateEvent(id: $eventId, input: $eventInput) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(id: $eventId) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const DELETE_ALL_EVENTS = gql`
  mutation deleteAllEvents {
    deleteAllEvents {
      count
    }
  }
`;
