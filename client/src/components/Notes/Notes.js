import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Note from './Note/Note';
import useStyles from './styles';
import { getNotes } from '../../actions/notes';

const Notes = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getNotes());
}, [dispatch])

  console.log(notes)

  return (
    !notes.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {notes.map((note) => (
          <Grid key={note._id} item xs={12} sm={6} md={6}>
            <Note note={note} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Notes;