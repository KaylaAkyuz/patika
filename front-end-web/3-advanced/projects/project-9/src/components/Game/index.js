import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import Score from "../Score";
import Result from "../Result";
import LanguageToggle from "../LanguageToggle";

const choices = [
  {
    name: "rock",
    label: "石",
    image: `${process.env.PUBLIC_URL}/images/rock.png`,
  },
  {
    name: "paper",
    label: "紙",
    image: `${process.env.PUBLIC_URL}/images/paper.png`,
  },
  {
    name: "scissors",
    label: "はさみ",
    image: `${process.env.PUBLIC_URL}/images/scissors.png`,
  },
];

const labels = {
  rock: {
    en: "Rock",
    jp: "石",
  },
  paper: {
    en: "Paper",
    jp: "紙",
  },
  scissors: {
    en: "Scissors",
    jp: "はさみ",
  },
};

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [result, setResult] = useState(null);
  const [computerScore, setComputerScore] = useState(0);
  const [isJapanese, setIsJapanese] = useState(true);

  const [computerChoiceIndex, setComputerChoiceIndex] = useState(null);
  const [userChoosing, setUserChoosing] = useState(true);
  const [computerChoosing, setComputerChoosing] = useState(false);

  const handleComputerChoosingAnimation = (userChoice) => {
    let interval;

    interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      setComputerChoiceIndex(randomIndex);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const randomChoice = Math.floor(Math.random() * choices.length);

      setComputerChoice(randomChoice);
      setComputerChoosing(false);
      setUserChoosing(true);

      const choice = choices[randomChoice].name;

      if (userChoice === choice) {
        setResult("draw");
      } else if (
        (userChoice === "rock" && choice === "scissors") ||
        (userChoice === "paper" && choice === "rock") ||
        (userChoice === "scissors" && choice === "paper")
      ) {
        setResult("win");
        setUserScore(userScore + 1);
      } else {
        setResult("lose");
        setComputerScore(computerScore + 1);
      }
    }, 2000);
  };

  const handleChoiceClick = (choice) => {
    if (!userChoosing) return;
    setUserChoice(choice);
    setComputerChoice(null);
    setResult(null);
    setComputerChoiceIndex(null);
    setUserChoosing(false);
    setComputerChoosing(true);
    handleComputerChoosingAnimation(choice);
  };

  const handleToggleLanguage = () => {
    setIsJapanese(!isJapanese);
  };

  return (
    <div>
      <LanguageToggle
        onToggleLanguage={handleToggleLanguage}
        isJapanese={isJapanese}
      />
      <Score
        userScore={userScore}
        computerScore={computerScore}
        isJapanese={isJapanese}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        {computerChoosing && (
          <div className="computer-choosing-animation">
            {choices.map((choice, index) => (
              <img
                key={index}
                src={choice.image}
                alt={labels[choice.name][isJapanese ? "jp" : "en"]}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  display: index === computerChoiceIndex ? "block" : "none",
                  transform: `rotate(${Math.floor(
                    Math.random() * 360
                  )}deg) scale(${Math.random() + 0.5})`,
                }}
              />
            ))}
          </div>
        )}
        {computerChoice !== null && (
          <div
            style={{
              width: "100px",
              height: "100px",
              overflow: "hidden",

              position: "relative",
            }}
          >
            <img
              src={choices[computerChoice].image}
              alt={
                labels[choices[computerChoice].name][isJapanese ? "jp" : "en"]
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "normal",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor:
                  result === "win"
                    ? "#f5222d"
                    : result === "lose"
                    ? "#52c41a"
                    : "#1890ff",
                position: "absolute",
                top: 0,
                left: 0,
                mixBlendMode: "multiply",
              }}
            ></div>
          </div>
        )}

        <Result result={result} isJapanese={isJapanese} />
      </div>
      <Row justify="space-around">
        {choices.map((choice, index) => (
          <Col key={choice.name} span={8}>
            <Button
              type="primary"
              size="large"
              className="choice-button"
              disabled={
                !userChoosing
                  ? userChoice === choice.name
                    ? false
                    : true
                  : false
              }
              onClick={() => handleChoiceClick(choice.name)}
              style={{
                backgroundColor:
                  userChoice === choice.name &&
                  (result === "win"
                    ? "#52c41a"
                    : result === "lose"
                    ? "#f5222d"
                    : "#1890ff"),
                borderColor:
                  userChoice === choice.name &&
                  (result === "win"
                    ? "#52c41a"
                    : result === "lose"
                    ? "#f5222d"
                    : "#1890ff"),
                boxShadow:
                  userChoice === choice.name
                    ? "0px 0px 10px 0px rgba(24, 144, 255, 0.5)"
                    : computerChoice === choice.name
                    ? "0px 0px 10px 0px rgba(245, 34, 45, 0.5)"
                    : "",
                outline: "none",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                transition: "all 0.3s",
              }}
            >
              <img
                src={choice.image}
                alt={labels[choice.name][isJapanese ? "jp" : "en"]}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
              {labels[choice.name][isJapanese ? "jp" : "en"]}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Game;
