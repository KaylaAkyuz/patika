// src/components/Cart.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Button, Empty } from "antd";

const CartContainer = styled(Card)`
  text-align: center;
  padding: 20px;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContainer>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Empty description="Your cart is empty"></Empty>
      ) : (
        cartItems.map((item) => (
          <Card
            key={item.id}
            title={
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "10px",
                  paddingRight: "30px",
                }}
              >
                {item.title}
                <span>Price: ${item.price}</span>
              </div>
            }
            extra={
              <Button
                type="primary"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            }
            bodyStyle={{
              padding: "0px",
            }}
          />
        ))
      )}
    </CartContainer>
  );
};

export default Cart;
