export const Query = {
  users: (_, __, { database }) => database.users,
  user: (_, args, { database }) =>
    database.users.find((user) => user.id === args.id),
  events: (_, __, { database }) => database.events,
  event: (_, args, { database }) =>
    database.events.find((event) => event.id === args.id),
  locations: (_, __, { database }) => database.locations,
  location: (_, args, { database }) =>
    database.locations.find((location) => location.id === args.id),
  participants: (_, __, { database }) => database.participants,
  participant: (_, args, { database }) =>
    database.participants.find((participant) => participant.id === args.id),
};
