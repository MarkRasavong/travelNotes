import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createNote } from '../../../actions/notes';

import useStyles from './styles';

const Create = () => {
    const dispatch = useDispatch();
    const [ noteData, setNoteData ] = useState({ title: '', message: '', tags: [], selectedFile:'' });
    const classes = useStyles();

const clear = () => {
    setNoteData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };
    

const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(createNote(noteData));
      clear();
  };

return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Create a Note</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={noteData.creator} onChange={(e) => setNoteData({ ...noteData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={noteData.message} onChange={(e) => setNoteData({ ...noteData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={noteData.tags} onChange={(e) => setNoteData({ ...noteData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setNoteData({ ...noteData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}

export default Create;