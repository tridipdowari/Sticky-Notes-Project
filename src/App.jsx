import React, { useState, useEffect } from 'react';
import './App.css';

const getRandomColor = (tag) => {
  const tagColors = {
    yellow: '#FFF9C4',
    pink: '#F8BBD0',
    blue: '#BBDEFB',
    green: '#C8E6C9',
  };
  return tagColors[tag] || '#FFF9C4';
};

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');

  // ✅ Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('stickyNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // ✅ Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    const newNoteObj = {
      text: newNote,
      color: selectedColor,
    };
    setNotes([...notes, newNoteObj]);
    setNewNote('');
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setEditText(notes[index].text);
  };

  const handleSaveEdit = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = editText;
    setNotes(updatedNotes);
    setEditIndex(null);
    setEditText('');
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Sticky Notes</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <select
          className="color-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        <button onClick={handleAddNote}>Add</button>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="note-list">
        {filteredNotes.map((note, index) => (
          <div
            key={index}
            className="note"
            style={{ backgroundColor: getRandomColor(note.color) }}
          >
            {editIndex === index ? (
              <>
                <textarea
                  className="edit-textarea"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="note-buttons">
                  <button onClick={() => handleSaveEdit(index)}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{note.text}</p>
                <div className="note-buttons">
                  <button onClick={() => handleEditNote(index)}>Edit</button>
                  <button onClick={() => handleDeleteNote(index)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
