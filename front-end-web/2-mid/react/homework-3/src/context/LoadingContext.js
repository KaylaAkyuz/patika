import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

function LoadingContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [weatherFetch, setWeatherFetch] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ loading, setLoading, weatherFetch, setWeatherFetch }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

const useLoadingContext = () => useContext(LoadingContext);

export { useLoadingContext, LoadingContextProvider };
