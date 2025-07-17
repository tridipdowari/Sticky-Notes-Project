import React from "react";

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <p>{note.text}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default Note;
