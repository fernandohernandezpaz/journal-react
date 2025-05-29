import { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal/journalSlide";
import { useDispatch } from "react-redux";

export const SideBarItem = ({ id, title, body, date, imageURLs = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );

  const onClickNote = () => {
    dispatch( setActiveNote({ id, title, body, date, imageURLs }) );
  };

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
