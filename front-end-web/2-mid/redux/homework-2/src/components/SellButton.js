import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../reducers/purchasedItemsSlice";
import { selectProductById } from "../reducers/productsSlice";

const SellButton = ({ item }) => {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(item ? item.id : null));

  const handleSell = () => {
    dispatch(removeItem({ id: item.id, product: product }));
  };

  return (
    <button
      className="sell-button"
      onClick={handleSell}
      disabled={item ? (item.quantity === 0 ? true : false) : true}
    >
      Sell
    </button>
  );
};

export default SellButton;
