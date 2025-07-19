import React, { useState } from 'react';
import './App.css';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Sticky Notes</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Write a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <NoteList
        notes={filteredNotes}
        onDelete={deleteNote}
        onEdit={editNote}
      />
    </div>
  );
}

export default App;
