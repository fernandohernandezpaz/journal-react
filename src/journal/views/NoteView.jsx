import { useEffect, useMemo } from "react";

import { SaveOutlined, DeleteOutline } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, startSaveNote, startDeleteNote } from "../../store/journal";
import Swal from "sweetalert2";

export const NoteView = () => {

  const dispatch = useDispatch();
  const { activeNote, actionMessage, isSaving } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {{
    const newDate = new Date(date);

    return newDate.toUTCString();
  }}, [date]);

  useEffect(() => {

    dispatch( setActiveNote(formState) );

  }, [formState]);


  useEffect(() => {
    if (actionMessage) {
      Swal.fire({
        title: actionMessage,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }, [actionMessage])

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  };

  const onDelete = () => {
    dispatch( startDeleteNote() );
  }


  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button disabled={isSaving} color="primary" sx={{ padding: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Add a title"
          label="Title"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Description"
          label="Description"
          name="body"
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent={'center'}>
        <Button
          disabled={isSaving}
          onClick={onDelete}
          sx={{
            mt: 2,

          }}
          color="error"
        >
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery />
    </Grid>
  );
};
