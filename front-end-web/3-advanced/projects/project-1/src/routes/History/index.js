import React from "react";
import { Card, Table } from "antd";
import styled from "styled-components";

const HistoryContainer = styled.div`
  padding: 20px;
`;

const HistoryTable = styled(Table)`
  .ant-pagination-item-active {
    a {
      color: #94ffc7aa;
    }
  }
`;

const columns = [
  {
    title: "Height (cm)",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Weight (kg)",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "BMI",
    dataIndex: "bmi",
    key: "bmi",
  },
];

const History = () => {
  const historyData = JSON.parse(localStorage.getItem("bmiHistory")) || [];

  const dataWithKeys = historyData.map((item, index) => ({
    ...item,
    key: index,
  }));

  return (
    <HistoryContainer>
      <Card title="BMI History">
        <HistoryTable dataSource={dataWithKeys} columns={columns} />
      </Card>
    </HistoryContainer>
  );
};

export default History;
