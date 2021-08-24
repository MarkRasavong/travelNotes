import { Container, Grid, Grow } from '@material-ui/core';
import React, { useEffect } from 'react';

import useStyles from './styles'
import Notes from '../Notes/Notes';
import { getNotes } from '../../actions/notes';
import { useDispatch } from 'react-redux';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch])

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Notes />
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;