import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Note = ({ note, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={note.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={note.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{note.creator}</Typography>
        <Typography variant="body2">{moment(note.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(note._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{note.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{note.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{note.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => console.log('like')}><ThumbUpAltIcon fontSize="small" /> Like {note.likeCount} </Button>
        <Button size="small" color="primary" onClick={() =>console.log('delete')}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Note;