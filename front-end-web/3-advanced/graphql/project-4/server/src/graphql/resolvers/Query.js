export const Query = {
  questions: (_, __, { database }) => database.questions,
  question: (_, args, { database }) =>
    database.questions.find((question) => question.id === args.id),
  options: (_, __, { database }) => database.options,
  option: (_, args, { database }) =>
    database.options.find((option) => option.id === args.id),
};
