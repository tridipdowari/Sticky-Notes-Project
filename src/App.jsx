import React, { useState } from 'react';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState('all');

  const handleAddNote = () => {
    if (input.trim() === '') return;
    const newNote = {
      id: Date.now(),
      text: input,
      color: selectedColor
    };
    setNotes([newNote, ...notes]);
    setInput('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (id, newText) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, text: newText } : note
    ));
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.text.toLowerCase().includes(search.toLowerCase());
    const matchesColor = selectedColor === 'all' || note.color === selectedColor;
    return matchesSearch && matchesColor;
  });

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
        <select
          className="color-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
        </select>
        <button onClick={handleAddNote}>Add</button>
      </div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <NoteList
        notes={filteredNotes}
        onDelete={handleDeleteNote}
        onEdit={handleEditNote}
      />
    </div>
  );
};

export default App;
