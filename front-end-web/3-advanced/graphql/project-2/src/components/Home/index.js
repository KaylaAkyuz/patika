import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Image,
  Row,
  Col,
  Pagination,
  Input,
  Checkbox,
  Skeleton,
  Button,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS, GET_CHARACTERS } from "graphql/queries";

const { Title: AntdTitle, Paragraph } = Typography;

const genders = ["Male", "Female", "Genderless", "unknown"];

const species = [
  "Human",
  "Alien",
  "Humanoid",
  "Animal",
  "Robot",
  "Cronenberg",
  "Mythological Creature",
  "Disease",
  "Poopybutthole",
  "Planet",
  "unknown",
];

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  const newResults = new Set([
    ...previousResult.characters.results,
    ...fetchMoreResult.characters.results,
  ]);

  fetchMoreResult.characters.results = [...newResults];

  return { ...fetchMoreResult };
};

function Home() {
  const [genderCheckboxValue, setGenderCheckboxValue] = useState([]);
  const [speciesCheckboxValue, setSpeciesCheckboxValue] = useState([]);
  const [locationsCheckboxValue, setLocationsCheckboxValue] = useState([]);
  const [page, setPage] = useState(1);
  const [locationsPage, setLocationsPage] = useState(1);
  const [fetchAll, setFetchAll] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    gender: [],
    species: [],
    locations: [],
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleLocationPageChange = (page) => {
    setLocationsPage(page);
  };

  const handleSearchChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      name: e,
    }));
    return;
  };

  const handleLocationChange = (e) => {
    setLocation(e);
  };

  const handleFilterChange = (name, e) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const handleClearFilter = (name) => {
    setFilters((prevState) => ({
      ...prevState,
      gender: [],
      species: [],
      locations: [],
    }));
    setGenderCheckboxValue([]);
    setSpeciesCheckboxValue([]);
  };

  const {
    loading: locationLoading,
    error: locationError,
    data: locations,
    refetch: refetchLocations,
  } = useQuery(GET_LOCATIONS, {
    variables: {
      page: 1,
      filter: {
        name: "",
      },
    },
  });

  const { error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
    },
  });

  useEffect(() => {
    refetchLocations({
      page: locationsPage,
      filter: {
        name: location,
      },
    });
  }, [location, locationsPage, refetchLocations]);

  useEffect(() => {
    if (fetchAll) {
      if (data) {
        if (data.characters.results.length >= data.characters.info.count) {
          setLoading(false);
        }
      }
      return;
    }
    if (data && fetchMore) {
      const pages = data.characters.info.pages;

      for (let i = 2; i <= pages; i++) {
        fetchMore({
          updateQuery,
          variables: {
            page: i,
          },
        });
      }

      setFetchAll(true);
    }
  }, [data, fetchMore, fetchAll]);

  const filteredResults = data
    ? data.characters.results.filter((result) => {
        const nameCondition =
          !filters.name ||
          result.name.toLowerCase().includes(filters.name.toLowerCase());

        const genderCondition =
          filters.gender.length === 0 || filters.gender.includes(result.gender);

        const speciesCondition =
          filters.species.length === 0 ||
          filters.species.includes(result.species);

        const locationCondition =
          filters.locations.length === 0 ||
          filters.locations.includes(result.location.name);

        return (
          nameCondition &&
          genderCondition &&
          speciesCondition &&
          locationCondition
        );
      })
    : [];

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/images/banner.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          minHeight: "29rem",
          padding: "15rem 10rem 10rem 10rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "25rem",
            justifySelf: "center",
            margin: "auto",
          }}
        >
          <Input.Search
            placeholder="Search by name and press enter"
            allowClear={{
              clearIcon: (
                <CloseCircleOutlined className="search-icon-custom-color" />
              ),
            }}
            defaultValue={filters.name}
            enterButton
            onSearch={handleSearchChange}
            loading={loading}
            size="large"
          />
        </div>
      </div>
      <Card
        style={{
          margin: "2rem 6rem",
          display: "flex",
        }}
        bodyStyle={{
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={6}>
            <Card>
              <Button
                onClick={handleClearFilter}
                style={{
                  width: "100%",
                }}
                loading={loading}
              >
                Clear Filters
              </Button>
            </Card>
            <Card title="Genders">
              <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
                <Checkbox.Group
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  options={genders}
                  value={genderCheckboxValue}
                  onChange={(e) => {
                    setGenderCheckboxValue(e);
                    handleFilterChange("gender", e);
                  }}
                ></Checkbox.Group>
              </Skeleton>
            </Card>
            <Card title="Species">
              <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                <Checkbox.Group
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  options={species}
                  value={speciesCheckboxValue}
                  onChange={(e) => {
                    setSpeciesCheckboxValue(e);
                    handleFilterChange("species", e);
                  }}
                ></Checkbox.Group>
              </Skeleton>
            </Card>
            <Card title="Locations">
              <Input.Search
                onSearch={handleLocationChange}
                enterButton
                loading={locationLoading}
              />
              <Skeleton
                loading={locationLoading || loading}
                active
                paragraph={{ rows: 10 }}
              >
                {locationError ? (
                  <p>Error: {locationError}</p>
                ) : (
                  <Checkbox.Group
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    options={
                      locations
                        ? locations.locations.results.map((location) =>
                            location.name.length > 35
                              ? location.name.substring(0, 35) + "..."
                              : location.name
                          )
                        : []
                    }
                    value={locationsCheckboxValue}
                    onChange={(e) => {
                      setLocationsCheckboxValue(e);
                      handleFilterChange("locations", e);
                    }}
                  ></Checkbox.Group>
                )}
              </Skeleton>
              <Pagination
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                }}
                defaultCurrent={1}
                loading={locationLoading}
                total={locations && locations.locations.info.count}
                pageSize={20}
                showSizeChanger={false}
                size="small"
                onChange={handleLocationPageChange}
              />
            </Card>
          </Col>
          <Col xs={18}>
            <Skeleton loading={loading} active avatar paragraph={{ rows: 8 }}>
              {error ? (
                <p>Error: {error}(</p>
              ) : (
                <Row gutter={[16, 16]}>
                  {data &&
                    filteredResults
                      .slice((page - 1) * 20, page * 20)
                      .map((result, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6}>
                          <Card hoverable cover={<Image src={result.image} />}>
                            <span
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {result.species}
                            </span>
                            <AntdTitle level={4}>{result.name}</AntdTitle>

                            <Paragraph>{result.location.name}</Paragraph>
                          </Card>
                        </Col>
                      ))}
                </Row>
              )}

              <Pagination
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                }}
                defaultCurrent={1}
                total={filteredResults && filteredResults.length}
                pageSize={20}
                showSizeChanger={false}
                onChange={handlePageChange}
              />
            </Skeleton>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Home;
