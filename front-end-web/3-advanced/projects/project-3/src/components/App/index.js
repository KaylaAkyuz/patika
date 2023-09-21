import React, { useState, useEffect } from "react";
import Note from "../Note";
import styled from "styled-components";
import { Button, Card, Input } from "antd";

const { TextArea } = Input;

const Container = styled(Card)`
  width: 70%;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      const timestamp = new Date().toLocaleString();
      setNotes([...notes, { note: newNote, timestamp }]);
      setNewNote("");
    }
  };

  const handleNoteUpdate = (updatedNote, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].note = updatedNote;
    setNotes(updatedNotes);
  };

  const handleNoteDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Container>
      <h1>Markdown Notes</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextArea
          placeholder="Enter your note in markdown..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
        <Button
          type="primary"
          onClick={handleAddNote}
          style={{
            marginBottom: "2rem",
          }}
        >
          Add Note
        </Button>
      </div>
      {notes.map((note, index) => (
        <Note
          key={index}
          note={note.note}
          timestamp={note.timestamp}
          onUpdate={(updatedNote) => handleNoteUpdate(updatedNote, index)}
          onDelete={() => handleNoteDelete(index)}
        />
      ))}
    </Container>
  );
};

export default App;
