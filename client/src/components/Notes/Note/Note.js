import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'; 
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deleteNote, likePost } from '../../../actions/notes';

const Note = ({ note, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (note.likes.length > 0) {
      return note.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{note.likes.length > 2 ? `You and ${note.likes.length - 1} others` : `${note.likes.length} like${note.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{note.likes.length} {note.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };



  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={note.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={note.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{note.name}</Typography>
        <Typography variant="body2">{moment(note.createdAt).fromNow()}</Typography>
      </div>
      { (user?.result?.googleId === note?.creator || user?.result?._id === note?.creator) && (
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(note._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
          )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{note.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{note.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{note.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(note._id))}>
          <Likes />
          </Button>
          { (user?.result?.googleId === note?.creator || user?.result?._id === note?.creator) && (
            <Button size="small" color="primary" onClick={() => dispatch(deleteNote(note._id))}><DeleteIcon fontSize="small" /> Delete</Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Note;