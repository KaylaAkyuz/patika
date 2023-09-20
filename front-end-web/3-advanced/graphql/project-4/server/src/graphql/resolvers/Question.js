export const Question = {
  options: (parent, _, { database }) =>
    database.options.filter((option) => option.poll_id === parent.id),
};
