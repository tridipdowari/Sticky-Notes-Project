import React, { useState } from 'react';

const Note = ({ id, text, onDelete, onEdit, color }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editedText);
    }
    setIsEditing(!isEditing);
  };

  const backgroundColor = {
    pink: '#FFE6E6',
    blue: '#E3F6F5',
    yellow: '#FFF5BA',
    green: '#D2F6C5'
  }[color] || '#FFE6E6';

  return (
    <div className="note" style={{ backgroundColor }}>
      {isEditing ? (
        <textarea
          className="edit-textarea"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p>{text}</p>
      )}
      <div className="note-buttons">
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => onDelete(id)}>✕</button>
      </div>
    </div>
  );
};

export default Note;
