import React from "react";
import { useSelector } from "react-redux";
import "./PurchasedItems.css";

const PurchasedItems = () => {
  const purchasedItems = useSelector((state) => state.purchasedItems);

  const totalPrice = purchasedItems.reduce(
    (total, item) => total + item.totalCost,
    0
  );

  return (
    <div className="purchased-items">
      <h3>Your Receipt</h3>
      <ul>
        {purchasedItems.map((item) => (
          <li key={item.id} className="receipt-item">
            <div className="receipt-item-details">
              <span className="receipt-item-title">{item.title}</span>
              <span className="receipt-item-quantity">x{item.quantity}</span>
            </div>
            <span className="receipt-item-total">
              ${item.totalCost.toLocaleString()}
            </span>
          </li>
        ))}
        <hr className="receipt-line" />
        <li className="receipt-total">
          <span>Total</span>
          <span>${totalPrice.toLocaleString()}</span>
        </li>
      </ul>
    </div>
  );
};

export default PurchasedItems;
