import React, { useState } from "react";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (noteInput.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: noteInput,
    };

    setNotes([...notes, newNote]);
    setNoteInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app">
      <h1>Sticky Notes</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;