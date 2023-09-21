// src/components/Favorites.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Empty } from "antd";
import ProductCard from "../../components/ProductCard";

const FavoritesContainer = styled(Card)`
  text-align: center;
  padding: 20px;
`;

const CatalogContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const favoriteProductsFiltered = products.filter((product) =>
      favorites.includes(product.id.toString())
    );

    setFavoriteProducts(favoriteProductsFiltered);
  }, [products]);

  return (
    <FavoritesContainer>
      <h1>Your Favorite Products</h1>
      <CatalogContainer>
        {favoriteProducts.length === 0 ? (
          <Empty description="You haven't added any products to your favorites." />
        ) : (
          favoriteProducts.map((product) => (
            <ProductCard product={product} justView={true} />
          ))
        )}
      </CatalogContainer>
    </FavoritesContainer>
  );
};

export default Favorites;
