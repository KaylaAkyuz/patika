import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalData } from "../redux/totalCovidSlice";
import { fetchPrefecturesData } from "../redux/prefecturesCovidSlice";
import Card from "./Card/Card";
import Dropdown from "./Dropdown/Dropdown";
import PrefectureDetails from "./PrefectureDetails/PrefectureDetails";
import { selectTotalCovid } from "../redux/totalCovidSlice";
import {
  selectPrefectures,
  selectPrefectureCovidData,
} from "../redux/prefecturesCovidSlice";

import "./App.css";

const getDate = (date) => {
  if (!date) {
    return null;
  }

  return new Date(
    date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function App() {
  const dispatch = useDispatch();
  const [selectedPrefecture, setSelectedPrefecture] = useState("Tokyo");

  const { isLoading, error } = useSelector((state) => state.totalCovid);
  const { isLoading: prefecturesLoading, error: prefecturesError } =
    useSelector((state) => state.prefecturesCovid);

  const totalData = useSelector(selectTotalCovid);
  const prefectureData = useSelector(
    selectPrefectureCovidData(selectedPrefecture)
  );

  const prefectures = useSelector(selectPrefectures);

  const handlePrefectureChange = (prefecture) => {
    setSelectedPrefecture(prefecture);
  };

  useEffect(() => {
    dispatch(fetchTotalData());
    dispatch(fetchPrefecturesData());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="header">
        <h1>COVID-19 in Japan</h1>
      </div>
      {isLoading || prefecturesLoading ? (
        <p>Loading...</p>
      ) : error || prefecturesError ? (
        <p>
          Error: {error} {prefecturesError}
        </p>
      ) : (
        <div className="cards-container">
          <Card
            title="Infected"
            data={totalData?.infected || 0}
            lastUpdated={getDate(totalData?.date)}
            color="#ffbdbd"
          />
          <Card
            title="Recovered"
            data={totalData?.recovered || 0}
            lastUpdated={getDate(totalData?.date)}
            color="#a9ffd3"
          />
          <Card
            title="Deceased"
            data={totalData?.deceased || 0}
            lastUpdated={getDate(totalData?.date)}
            color="#8bf2ef"
          />
          <Card
            title="Active"
            data={totalData?.active || 0}
            lastUpdated={getDate(totalData?.date)}
            color="#ffd270"
          />
        </div>
      )}
      <Dropdown
        prefectures={prefectures}
        selectedPrefecture={selectedPrefecture}
        onChange={handlePrefectureChange}
      />
      <PrefectureDetails prefectureData={prefectureData} />
    </div>
  );
}

export default App;
