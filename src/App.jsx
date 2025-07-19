import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('stickyNotes');
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteText.trim() === '') return;
    const newNote = { id: Date.now(), text: noteText };
    setNotes([newNote, ...notes]);
    setNoteText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, newText) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <h1>Sticky Notes</h1>
      <div className="input-container">
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note..."
        />
        <button onClick={addNote}>Add</button>
      </div>
      <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
}

export default App;
