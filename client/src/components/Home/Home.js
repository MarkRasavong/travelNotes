import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

//hook function that searches for a specific query a user makes and then parsed from the url and into the BE.
function useQuery(){
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  //calls query function and parses page or searchQuery to determine currentPage or search. const query is a hook function.  
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');

  const searchPost = () => {
    //trim any whitespace. if there is either a search we dispatch it to our backend and search for any note containing what the user is querying for. 
    if (search.trim() ) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField onKeyDown={handleKeyPress} name="search" variant='outlined' label='Search Notes' fullWidth value={search} onChange={ e => setSearch(e.target.value)} />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery ) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

/*
Search Feature
1. make a query function of what the user input into the TextField. The url will be parsed and sent to the API backend.
2. ensure that when a user submits whether it's a keypress (enter) or an onClick on the search button. These two actions will call the searchNote function. 
3. dispatch an action creator to call to api/redux state.
 */