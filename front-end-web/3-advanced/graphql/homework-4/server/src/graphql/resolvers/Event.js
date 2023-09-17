export const Event = {
  location: (parent, __, { database }) =>
    database.locations.find((location) => location.id === parent.location_id),
  participants: (parent, __, { database }) =>
    database.participants.filter(
      (participant) => participant.event_id === parent.id
    ),
  user: (parent, __, { database }) =>
    database.users.find((user) => user.id === parent.user_id),
};
