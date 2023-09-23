import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "components/SearchBar";
import BookList from "components/BookList";
import { Pagination, Card, Skeleton } from "antd";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleSearch = (query) => {
      const apiUrl = `https://openlibrary.org/search.json?q=${query}&fields=key,type,title,edition_count,first_publish_year,number_of_pages_median,author_key,author_name,cover_i&limit=${pageSize}&page=${page}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const bookResults = response.data.docs;
          console.log(response.data.numFound);

          setData(bookResults);
          setTotal(response.data.numFound);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book data:", error);
          setError(error);
        });
    };

    if (searchText.length > 0) {
      setLoading(true);
      setError(null);

      handleSearch(searchText);
    } else {
      setData([]);
      setTotal(0);
    }
  }, [searchText, page, pageSize]);

  const handleSearchChange = (query) => {
    setPage(1);
    setSearchText(query);
  };

  return (
    <div
      style={{
        background: `url(${process.env.PUBLIC_URL}/images/banner.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        title={<h1>Open Library Browser</h1>}
        style={{
          height: "100vh",
        }}
      >
        <SearchBar onSearch={handleSearchChange} />
        <Skeleton loading={loading} error={error}>
          {" "}
          <BookList data={data} />
          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
            onShowSizeChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[10, 20, 50]}
          />
        </Skeleton>
      </Card>
    </div>
  );
}

export default App;
