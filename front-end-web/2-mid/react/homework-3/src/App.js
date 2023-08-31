import { LoadingContextProvider } from "./context/LoadingContext";
import { GeoContextProvider } from "./context/GeoContext";
import { WeatherContextProvider } from "./context/WeatherContext";
import Container from "./components/Container";
import "./App.css";

function App() {
  return (
    <LoadingContextProvider>
      <GeoContextProvider>
        <WeatherContextProvider>
          <Container />
        </WeatherContextProvider>
      </GeoContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
