import { Button, TextField, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [ comment, setComment ] = useState('');
    const [ comments, setComments ] = useState(post?.comments);
    const classes = useStyles();
    const dispatch = useDispatch();
    // useRef hook to automatically scroll down the comments
    const commentsRef = useRef();

    const handleComment = async () => {
        //
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        //update our new state of Comments if the action is dispatched. 
        setComments(newComments);
        setComment('');

        //Scroll slowly to that specfic recent comment.
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
          <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
              <Typography gutterBottom variant="h6">Comments</Typography>
              {comments?.map((c, i) => (
                <Typography key={i} gutterBottom variant="subtitle1">
                    {/* bold on person's name and take the first and next index */}
                  <strong>{c.split(': ')[0]}</strong>
                  {c.split(':')[1]}
                </Typography>
              ))}
              {/* commentsRef : scroll to this specific div */}
              <div ref={commentsRef} />
            </div>
            {user?.result?.name &&
            <div style={{ width: '70%' }}>
              <Typography gutterBottom variant="h6">Write a comment</Typography>
              <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
              <br />
              <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                Comment
              </Button>
            </div>
            }
          </div>
        </div>
      );
    };
    

export default CommentSection;

/*
1. create the component and style it
2. @PostDetails import the new commentSection jsx and import the post data into this component. (destructre post data)
3. create a state with a inital state of an empty array. and another for the textfieslt [ comment, setComment ]
4. disable comment button if !comment.length
5. grab user from localStorage and create and dispatch commmentPost under handleComment
6. create a finalComment as a string to pass through the user's name and their commment and then pass it through the commentPost(); with the identified post._id in order to update that post when we findbyId()
7. create an action, api, update and add new route/controllers, edit our model, and add COMMENT reducer.
8. in some actions when you communicate to the backend it doesn't automatically display it in the FE. You can do this with hooks. QUICK LIKING under post  --> useState(post?.likes)/ handleLike
*/