import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  quantityUpdated,
  addItem,
  removeItem,
  selectCalculatedBalance,
} from "../reducers/purchasedItemsSlice";
import BuyButton from "./BuyButton";
import SellButton from "./SellButton";
import "./ProductList.css";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const purchasedItems = useSelector((state) => state.purchasedItems);
  const balance = useSelector(selectCalculatedBalance);
  const dispatch = useDispatch();

  return (
    <div className="product-list">
      <h2>Available Products</h2>
      <div className="product-grid">
        {products.map((product) => {
          const item = purchasedItems.find((item) => item.id === product.id);
          return (
            <div className="product-card" key={product.id}>
              <img
                src={`./images/products/${product.img}`}
                alt={product.title}
              />
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <div className="product-controls">
                  <div className="quantity-control">
                    <SellButton item={item} />
                    <input
                      type="number"
                      value={item ? item.quantity : 0}
                      className="quantity-display"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (newQuantity === 0) {
                          dispatch(
                            removeItem({
                              id: item.id,
                              product: product,
                              sellAll: true,
                            })
                          );
                          return;
                        }

                        const maxQuantity = Math.min(
                          newQuantity,
                          Math.floor(balance / product.price) +
                            (item ? item.quantity : 0)
                        );

                        if (newQuantity !== maxQuantity) {
                          e.target.value = maxQuantity;
                        }
                        console.log(maxQuantity);
                        if (maxQuantity > 0) {
                          if (item) {
                            dispatch(
                              quantityUpdated({
                                id: item.id,
                                quantity: maxQuantity,
                                product: product,
                              })
                            );
                          } else {
                            dispatch(
                              addItem({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                quantity: maxQuantity,
                              })
                            );
                          }
                        }
                      }}
                    />
                    <BuyButton
                      product={product}
                      balance={balance}
                      dispatch={dispatch}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
