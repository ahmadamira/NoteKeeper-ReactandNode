import React, { useContext } from "react";
import NoteCard from "../NoteCard/NoteCard";

import { Container, Grid, Box } from "@mui/material";
import NotesContext from "../Context/NotesContext";

const NotesGrid = () => {
  const { notes } = useContext(NotesContext);
  return (
    <Box>
      <Box sx={{ mb: "100px", mt: "50px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center">
            {notes.map((data) => (
              <Grid item key={data.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Grid container justifyContent="center">
                  <NoteCard
                    title={data.title}
                    description={data.content}
                    date={data.createdAt}
                    _id={data._id}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default NotesGrid;
