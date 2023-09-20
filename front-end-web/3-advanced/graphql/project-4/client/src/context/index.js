import React, { createContext, useState, useContext } from "react";

const VotingStatusContext = createContext();

export const VotingStatusProvider = ({ children }) => {
  const [votingStatus, setVotingStatus] = useState({});

  const markQuestionAsVoted = (questionId) => {
    setVotingStatus((prevStatus) => ({
      ...prevStatus,
      [questionId]: true,
    }));
  };

  return (
    <VotingStatusContext.Provider value={{ votingStatus, markQuestionAsVoted }}>
      {children}
    </VotingStatusContext.Provider>
  );
};

export const useVotingStatus = () => useContext(VotingStatusContext);
