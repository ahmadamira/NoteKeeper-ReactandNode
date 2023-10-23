import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NotesContext from "../Context/NotesContext";
function CreateNoteFiled() {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createNote } = useContext(NotesContext);
  const handleExpand = () => {
    setExpanded(true);
  };
  const handleCancel = () => {
    setExpanded(false);
    setTitle("");
    setContent("");
  };
  const handleAdd = () => {
    createNote(title, content);
    setExpanded(false);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      {expanded ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            sx={{ width: "50%", mb: "20px", mt: "20px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Take a Note ..."
            multiline
            variant="outlined"
            sx={{ width: "50%" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center", m: "10px" }}>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ ml: "10px" }} onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Box>
      ) : (
        <div onClick={handleExpand}>
          <TextField
            label="Take a Note"
            variant="outlined"
            sx={{ width: "50%", mb: "20px", mt: "20px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
export default CreateNoteFiled;
