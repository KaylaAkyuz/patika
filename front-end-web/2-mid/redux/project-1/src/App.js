import React from "react";
import "./App.css"; // Import your CSS file

import ParagraphGenerator from "./components/ParagraphGenerator";
import ParagraphDisplay from "./components/ParagraphDisplay";

function App() {
  return (
    <div className="App">
      <h1>Text Generator App</h1>
      <div className="main-content">
        <ParagraphGenerator />
        <ParagraphDisplay />
      </div>
    </div>
  );
}

export default App;
