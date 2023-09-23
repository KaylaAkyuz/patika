import React from "react";
import { Alert } from "antd";

const labels = {
  win: {
    en: "You Win!",
    jp: "あなたの勝ち！",
  },
  lose: {
    en: "Computer Wins!",
    jp: "コンピュータが勝ちました！",
  },
  draw: {
    en: "It's a Draw!",
    jp: "引き分けです！",
  },
};

const Result = ({ result, isJapanese }) => {
  const winMessage = labels.win[isJapanese ? "jp" : "en"];
  const loseMessage = labels.lose[isJapanese ? "jp" : "en"];
  const drawMessage = labels.draw[isJapanese ? "jp" : "en"];

  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {result === "win" && (
        <Alert message={winMessage} type="success" showIcon />
      )}
      {result === "lose" && (
        <Alert message={loseMessage} type="error" showIcon />
      )}
      {result === "draw" && (
        <Alert message={drawMessage} type="info" showIcon />
      )}
    </div>
  );
};

export default Result;
