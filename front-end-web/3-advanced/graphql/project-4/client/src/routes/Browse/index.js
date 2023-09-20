import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { List, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { GET_QUESTIONS, NEW_QUESTION_SUBSCRIPTION } from "../../graphql";

const Home = () => {
  const { loading, error, data, subscribeToMore, refetch } =
    useQuery(GET_QUESTIONS);

  useEffect(() => {
    subscribeToMore({
      document: NEW_QUESTION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newQuestion = subscriptionData.data.newQuestion;
        return Object.assign({}, prev, {
          questions: [...prev.questions, newQuestion],
        });
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const questions = data.questions;

  return (
    <div>
      <h1>Questions</h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={new Set(questions.slice().reverse())}
        renderItem={(question) => (
          <List.Item>
            <Card title={question.text}>
              <Link to={`/questions/${question.id}`}>View Details</Link>
            </Card>
          </List.Item>
        )}
      />
      <Link to="/questions/add">
        <Button type="primary" size="large" block>
          Create Question
        </Button>
      </Link>
    </div>
  );
};

export default Home;
