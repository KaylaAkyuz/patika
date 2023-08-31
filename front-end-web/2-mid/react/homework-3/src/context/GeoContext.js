import React, { createContext, useState, useEffect, useContext } from "react";
import data from "../assets/data/coordinates.json";
import { useLoadingContext } from "./LoadingContext";

const GeoContext = createContext();

function GeoContextProvider({ children }) {
  const [geoData, setGeoData] = useState(data);
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <GeoContext.Provider value={{ geoData, setGeoData }}>
      {children}
    </GeoContext.Provider>
  );
}

const useGeoContext = () => useContext(GeoContext);

export { useGeoContext, GeoContextProvider };
