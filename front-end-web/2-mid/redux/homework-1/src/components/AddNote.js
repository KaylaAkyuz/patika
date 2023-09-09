import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../reducers/noteSlice";
import "./AddNote.css";

const colorOptions = [
  "#ff6961", // Pastel Red
  "#b19cd9", // Light Pastel Purple
  "#fdfd96", // Pastel Yellow
  "#e0ffff", // Light Cyan
  "#90ee90", // Light Green
  "#ffd1dc", // Pastel Pink
];

const AddNote = () => {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff6961");
  const dispatch = useDispatch();

  const handleAddNote = () => {
    if (text.trim() !== "") {
      dispatch(addNote({ text, color: selectedColor }));
      setText("");
    }
  };

  return (
    <div className="add-note-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your note here..."
      />
      <div className="options">
        <span className="color-options">
          {colorOptions.map((color) => (
            <div
              key={color}
              className={`color-option ${
                selectedColor === color ? "selected" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
        </span>
        <button
          onClick={handleAddNote}
          className="add-button"
          title="Add Note!"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddNote;
