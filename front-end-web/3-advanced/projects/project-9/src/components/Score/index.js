import React from "react";
import { Statistic, Row, Col } from "antd";

const labels = {
  yourScore: {
    en: "Your Score",
    jp: "あなたのスコア",
  },
  computerScore: {
    en: "Computer's Score",
    jp: "コンピュータのスコア",
  },
};

const Score = ({ userScore, computerScore, isJapanese }) => {
  const yourScoreText = labels.yourScore[isJapanese ? "jp" : "en"];
  const computerScoreText = labels.computerScore[isJapanese ? "jp" : "en"];

  return (
    <div
      style={{
        margin: "0 2rem",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title={yourScoreText}
            value={userScore}
            style={{
              textAlign: "center",
            }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={computerScoreText}
            value={computerScore}
            style={{
              textAlign: "center",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Score;
