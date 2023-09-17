import gql from "graphql-tag";

export const ParticipantAdded = gql`
  subscription ParticipantAdded($participantID: Int!) {
    participantAdded(id: $participantID) {
      id
      user_id
      event_id
    }
  }
`;
