import React, { useState, useEffect } from "react";
import NotesContext from "../Context/NotesContext";
import axios from "axios";

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getNotes = async () => {
    const response = await axios.get("http://localhost:3001/notes");
    setNotes(response.data);
  };

  const createNote = async (title, content) => {
    try {
      const response = await axios.post("http://localhost:3001/notes", {
        title,
        content,
      });
      const newNote = response.data;
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error creating a new note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const url = `http://localhost:3001/notes/${noteId}`;
      await axios.delete(url);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting a note:", error);
    }
  };

  const updateNote = async (noteId, title, content) => {
    try {
      const url = `http://localhost:3001/notes/${noteId}`;
      const response = await axios.put(url, {
        title,
        content,
      });
      const updatedNote = response.data;
      setNotes(notes.map((note) => (note._id === noteId ? updatedNote : note)));
    } catch (error) {
      console.error("Error updating a note:", error);
    }
  };

  const searchNotes = (query) => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes: searchQuery ? searchNotes(searchQuery) : notes,
        createNote,
        deleteNote,
        updateNote,
        setSearchQuery,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
