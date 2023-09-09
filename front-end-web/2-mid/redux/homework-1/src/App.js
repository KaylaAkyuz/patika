import React from "react";
import AddNote from "./components/AddNote";
import FilterNotes from "./components/FilterNotes";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>NotesApp</h1>
      <FilterNotes />
      <AddNote />
      <NoteList />
    </div>
  );
}

export default App;
