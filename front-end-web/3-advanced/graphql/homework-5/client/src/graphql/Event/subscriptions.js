import { gql } from "@apollo/client";
import { EventFragment } from "graphql/Event/fragments";

export const EventCreated = gql`
  subscription EventCreated {
    eventCreated {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const EventUpdated = gql`
  subscription EventUpdated($eventID: Int!) {
    eventUpdated(id: $eventID) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;
