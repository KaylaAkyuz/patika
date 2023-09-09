import React from "react";
import { useSelector } from "react-redux";
import { selectCalculatedBalance } from "../reducers/purchasedItemsSlice";

const Balance = () => {
  const balance = useSelector(selectCalculatedBalance);

  return <div className="balance">${balance.toLocaleString()}</div>;
};

export default Balance;
