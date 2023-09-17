import gql from "graphql-tag";

export const LocationFragment = gql`
  fragment LocationFragment on Location {
    id
    name
    desc
    lat
    lng
  }
`;
