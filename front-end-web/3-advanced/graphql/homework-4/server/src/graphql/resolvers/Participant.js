export const Participant = {
  user: (parent, __, { database }) =>
    database.users.find((user) => user.id === parent.user_id),
  event: (parent, __, { database }) =>
    database.events.find((event) => event.id === parent.event_id),
};
