import React, { useState } from "react";
import { Skeleton } from "antd";
import ProductCard from "../../components/ProductCard";
import styled from "styled-components";
import axios from "axios";

const CatalogContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Catalog = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setProducts(response.data);
    setLoading(false);
  };

  if (loading) {
    fetchProducts();
  }

  return (
    <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
      <CatalogContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CatalogContainer>
    </Skeleton>
  );
};

export default Catalog;
