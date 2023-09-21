import React from "react";
import { Card, Button, notification, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Title } = Typography;

const ProductCard = styled(Card)`
  width: 300px;
  margin: 16px;
  text-align: center;
`;

const ColoredLink = styled(Link)`
  color: white;
  &:hover {
    color: #94ffc7;
  }
`;

const Product = ({ product, justView }) => {
  const [api, contextHolder] = notification.useNotification();

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart.find((item) => item.id === product.id)) {
      api.error({
        message: "Product already in cart",
        description: `${product.title} is already in your cart.`,
      });
      return;
    }

    const updatedCart = [...storedCart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    api.success({
      message: "Product added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <ProductCard
      key={product.id}
      title={
        <ColoredLink to={`/product?id=${product.id}`}>
          {product.title}
        </ColoredLink>
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        height: "94%",
      }}
    >
      {contextHolder}
      <Link to={`/product?id=${product.id}`}>
        <div
          style={{
            height: 400,
            overflow: "hidden",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={product.image} preview={false} />
        </div>
      </Link>
      {!justView && (
        <Card
          style={{
            borderColor: "#4d149f",
            background: "none",
            borderTop: "none",
          }}
          bodyStyle={{
            display: "flex",
            textAlign: "center",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Title level={5}>Price: ${product.price}</Title>

          <Button
            type="primary"
            style={{
              marginTop: "0.8rem",
            }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </Card>
      )}
    </ProductCard>
  );
};

export default Product;
