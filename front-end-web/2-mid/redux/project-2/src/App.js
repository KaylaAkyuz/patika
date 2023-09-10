import React from "react";
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import SampleMarkdown from "./components/SampleMarkdown";
import Author from "./components/Author";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Markdown Viewer</h1>
      </header>
      <SampleMarkdown />
      <main className="app-main">
        <MarkdownEditor />
        <MarkdownPreview />
      </main>
      <Author />
    </div>
  );
}

export default App;
