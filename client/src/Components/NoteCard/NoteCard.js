import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Add an Edit icon
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import NotesContext from "../Context/NotesContext";

export default function NoteCard(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { title, description, date, _id } = props;
  const handleHover = (hover) => {
    setIsHovered(hover);
  };
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const day = fullDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  const { deleteNote, updateNote } = useContext(NotesContext);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleDeleteNote = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteNote(_id);
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleUpdateNote = () => {
    setUpdateDialogOpen(true);
  };

  const handleSaveNote = () => {
    updateNote(_id, updatedTitle, updatedDescription);
    setUpdateDialogOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  return (
    <Box sx={{ minWidth: 275, maxWidth: 276 }}>
      <Card
        variant="outlined"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <CardContent
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            textAlign: "left",
          }}
          sx={{ height: "200px" }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" paragraph={true}>
            {description}
          </Typography>
          <Typography variant="h6" sx={{ color: "blue" }}>
            {formattedDate}
          </Typography>
          {isHovered && (
            <div>
              <IconButton
                sx={{ position: "absolute", bottom: "8px", right: "60px" }}
                aria-label="edit"
                onClick={handleUpdateNote}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ position: "absolute", bottom: "8px", right: "8px" }}
                aria-label="delete"
                onClick={handleDeleteNote}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Note Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this note?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            sx={{ mt: "10px", mb: "20px" }}
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNote} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
