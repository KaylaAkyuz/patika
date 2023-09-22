import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "components/SearchBar";
import CurrencyList from "components/CurrencyList";
import { Pagination, Card } from "antd";

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(250);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: pageSize,
              page: page,
              sparkline: false,
            },
          }
        );
        setOriginalData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list",
          {
            params: {
              include_platform: false,
            },
          }
        );
        setTotal(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <Card title={<h1>CyberCoin Crypto Browser</h1>}>
      <SearchBar onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <CurrencyList data={filteredData} />}
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        onShowSizeChange={(current, size) => setPageSize(size)}
        onChange={(value) => setPage(value)}
      />
    </Card>
  );
}

export default App;
