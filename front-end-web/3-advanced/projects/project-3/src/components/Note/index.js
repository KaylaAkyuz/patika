import React, { useState } from "react";
import { Card, Button, Input, Space } from "antd";
import styled from "styled-components";
import { Marked } from "marked";

const { TextArea } = Input;
const marked = new Marked();

const StyledNote = styled(Card)`
  margin-bottom: 16px;
`;

const Note = ({ note, timestamp, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedNote(note);
  };

  const handleSaveEdit = () => {
    onUpdate(editedNote);
    setIsEditing(false);
  };

  const handleNoteChange = (e) => {
    setEditedNote(e.target.value);
  };

  return (
    <StyledNote
      title={isEditing ? "Edit Note" : `Note (Created at: ${timestamp})`}
      extra={
        isEditing ? (
          <Space>
            <Button type="primary" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button onClick={onDelete}>Delete</Button>
          </Space>
        )
      }
    >
      {isEditing ? (
        <TextArea
          value={editedNote}
          onChange={handleNoteChange}
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(note, { sanitize: true }),
          }}
        />
      )}
    </StyledNote>
  );
};

export default Note;
