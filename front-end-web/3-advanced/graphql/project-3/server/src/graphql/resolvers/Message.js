export const Message = {
  user: (parent, __, { database }) =>
    database.users.find((user) => user.id === parent.userId),
};
