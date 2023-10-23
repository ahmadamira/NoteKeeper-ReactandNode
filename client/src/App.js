import "./App.css";
import React from "react";
import CreateNoteFiled from "./Components/CreateNoteFiled/CreateNoteFiled";
import Header from "./Components/Header/Header";
import NotesGrid from "./Components/NotesGrid/NotesGrid";
import NotesProvider from "./Components/Providers/NotesProvider";

function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Header />
        <CreateNoteFiled />
        <NotesGrid />
      </NotesProvider>
    </div>
  );
}

export default App;
