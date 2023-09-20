import { nanoid } from "nanoid";
export const Mutation = {
  createQuestion: (_, args, { database, pubsub }) => {
    const question = {
      id: args.id,
      text: args.text,
    };

    database.questions.push(question);

    pubsub.publish("newQuestion", { newQuestion: question });

    return question;
  },
  createOption: (_, args, { database, pubsub }) => {
    const option = {
      id: nanoid(),
      text: args.text,
      poll_id: args.poll_id,
      votes: 0,
    };

    database.options.push(option);

    pubsub.publish("newOption", { newOption: option });

    return option;
  },
  vote: (_, args, { database, pubsub }) => {
    const option = database.options.find(
      (option) => option.id === args.optionId
    );
    option.votes++;

    const question = database.questions.find(
      (question) => question.id === args.questionId
    );

    pubsub.publish(`updatedQuestion:${question.id}`, {
      updatedQuestion: question,
    });

    return question;
  },
};
