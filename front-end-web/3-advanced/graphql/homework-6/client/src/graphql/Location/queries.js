import { gql } from "@apollo/client";
import { LocationFragment } from "graphql/Location/fragments";

export const getLocations = gql`
  query getLocations {
    locations {
      ...LocationFragment
    }
  }
  ${LocationFragment}
`;

export const getLocation = gql`
  query getLocation($locationId: Int!) {
    location(id: $locationId) {
      ...LocationFragment
    }
  }
  ${LocationFragment}
`;
