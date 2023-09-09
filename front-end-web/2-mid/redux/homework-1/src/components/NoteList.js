import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredNotes } from "../reducers/noteSlice";
import "./NoteList.css";

const NoteList = () => {
  const notes = useSelector(selectFilteredNotes);

  return (
    <div className="note-grid">
      {notes.map((note, index) => (
        <div
          key={index}
          className="note"
          style={{ backgroundColor: note.color }}
        >
          {note.text}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
