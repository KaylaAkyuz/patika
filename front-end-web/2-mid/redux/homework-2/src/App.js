import React from "react";
import ProductList from "./components/ProductList";
import Balance from "./components/Balance";
import PurchasedItems from "./components/PurchasedItems";
import "./App.css";

function App() {
  return (
    <div className="App">
      <img
        src="./images/billgates.jpg"
        alt="billgates"
        className="profile-photo"
      />
      <h1>Spend Bill Gates' Money</h1>
      <Balance />
      <ProductList />
      <PurchasedItems />
    </div>
  );
}

export default App;
