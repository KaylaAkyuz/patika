import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query locations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      results {
        name
      }

      info {
        count
        next
        pages
        prev
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        next
        pages
        prev
      }

      results {
        id
        name
        gender
        species
        image
        location {
          name
        }
      }
    }
  }
`;
