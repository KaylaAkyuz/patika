import gql from "graphql-tag";
import { ParticipantFragment } from "graphql/Participant/fragments";

export const ParticipantAdded = gql`
  subscription ParticipantAdded($participantID: Int!) {
    participantAdded(id: $participantID) {
      ...ParticipantFragment
    }
  }
  ${ParticipantFragment}
`;
