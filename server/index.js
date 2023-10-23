const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1/notes", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB Connection Error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Note = mongoose.model("Note", {
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({}).lean();
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newNote = new Note({ title, content });

  newNote
    .save()
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((err) => {
      console.error("Error saving note:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId).exec();

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    ).exec();

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
