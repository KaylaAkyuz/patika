export const User = {
  events: (parent, _, { database }) =>
    database.events.filter((event) => event.user_id === parent.id),
};
