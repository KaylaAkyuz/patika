import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

const Home = () => {
  return (
    <Card title="Welcome to questions app!">
      <Title level={5}>
        You can navigate to the questions page from the panel on the left
      </Title>
    </Card>
  );
};

export default Home;
