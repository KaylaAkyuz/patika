import { gql } from "@apollo/client";
import { EventFragment } from "graphql/Event/fragments";

export const getEvents = gql`
  query getEvents {
    events {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const getEvent = gql`
  query getEvent($eventId: Int!) {
    event(id: $eventId) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;
