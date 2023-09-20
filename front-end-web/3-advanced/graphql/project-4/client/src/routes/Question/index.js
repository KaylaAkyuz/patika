import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card, List, Button } from "antd";
import { useVotingStatus } from "../../context";
import { VOTE_SUBSCRIPTION, GET_QUESTION, VOTE } from "../../graphql";

const QuestionDetails = () => {
  const id = useParams().id;
  const { votingStatus, markQuestionAsVoted } = useVotingStatus();
  const [vote] = useMutation(VOTE);
  const { loading, error, data, subscribeToMore } = useQuery(GET_QUESTION, {
    variables: { id: id },
  });

  const isVoted = votingStatus[id] || false;

  useEffect(() => {
    subscribeToMore({
      document: VOTE_SUBSCRIPTION,
      variables: { id: id },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) return prev;
        const updatedQuestion = subscriptionData.data.updatedQuestion;
        return {
          question: updatedQuestion,
        };
      },
    });
  }, [id, subscribeToMore]);

  const handleVote = (questionId, optionId) => {
    if (isVoted) return;
    vote({
      variables: {
        questionId,
        optionId,
      },
    });
    markQuestionAsVoted(questionId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const question = data.question;
  const totalVotes = question.options.reduce((acc, option) => {
    return acc + option.votes;
  }, 0);

  return (
    <div>
      <h1>Question Details</h1>
      <Card title={question.text}>
        <List
          dataSource={question.options}
          renderItem={(option) => (
            <List.Item>
              {option.text}{" "}
              {isVoted ? (
                <>
                  - Votes: {option.votes}{" "}
                  {`(${Math.floor((option.votes / totalVotes) * 100)}%)`}
                </>
              ) : (
                <Button onClick={() => handleVote(question.id, option.id)}>
                  Vote
                </Button>
              )}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default QuestionDetails;
