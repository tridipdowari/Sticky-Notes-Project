import React, { useState } from 'react';

function Note({ id, text, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSave = () => {
    if (newText.trim()) {
      onEdit(id, newText);
      setIsEditing(false);
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>{text}</p>
          <button onClick={() => onDelete(id)}>X</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Note;
