import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <Search
      placeholder="Search for cryptocurrencies in current page"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBar;
