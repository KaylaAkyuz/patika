import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Card, Skeleton, Button, notification, Image } from "antd";
import axios from "axios";

const ProductDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductCard = styled(Card)`
  width: 300px;
  text-align: center;
`;

const ProductDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

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

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId) => favId !== id);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);

      api.success({
        message: "Removed from favorites",
        description: `${product.title} has been removed from your favorites.`,
      });
    } else {
      const updatedFavorites = [...favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);

      api.success({
        message: "Added to favorites",
        description: `${product.title} has been added to your favorites.`,
      });
    }
  };

  return (
    <Skeleton loading={loading} active>
      {contextHolder}
      <ProductDetailsContainer>
        <ProductCard title={product?.title}>
          <Image src={product?.image} preview={false} />
          <p>{product?.description}</p>
          <p>Price: ${product?.price}</p>
          <Button
            type="primary"
            onClick={handleToggleFavorite}
            icon={isFavorite ? <StarFilled /> : <StarOutlined />}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            type="primary"
            style={{
              marginTop: "0.8rem",
            }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </ProductCard>
      </ProductDetailsContainer>
    </Skeleton>
  );
};

export default ProductDetails;
