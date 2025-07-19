import React, { useState } from 'react';

const Note = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(note.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="note">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={4}
          style={{ width: '100%', resize: 'none', borderRadius: '8px' }}
        />
      ) : (
        <p>{note.text}</p>
      )}
      <button onClick={() => onDelete(note.id)}>X</button>
      <button onClick={handleEdit} style={{ top: '35px', right: '8px' }}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Note;
