import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../reducers/purchasedItemsSlice";
import { selectCalculatedBalance } from "../reducers/purchasedItemsSlice";

const BuyButton = ({ product }) => {
  const dispatch = useDispatch();
  const balance = useSelector(selectCalculatedBalance);

  const handleBuy = () => {
    if (product.price <= balance) {
      dispatch(addItem(product));
    }
  };

  return (
    <button
      className="buy-button"
      onClick={handleBuy}
      disabled={product.price > balance}
    >
      Buy
    </button>
  );
};

export default BuyButton;
