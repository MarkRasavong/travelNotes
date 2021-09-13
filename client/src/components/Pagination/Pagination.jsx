import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { getPosts } from '../../actions/posts';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(page){
            dispatch(getPosts(page));
        }
    }, [dispatch, page])

    return (
        <Pagination 
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant='outlined'
        color='primary'
        renderItem={ item => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
        />
    );
};

export default Paginate;

/*
PAGINATION
@Home.js
1. page starts at 1 and each item will represent a link component that will pass in the the page number on the item and page number.
@Paginate
1. import the page docuement. Page number = to the query on the url `/posts?page=${item.page}`.
2. Revamp all of the getPosts AC by passing in the page number in  order for the Posts and Page Number to sync well together. 
    -Ensure that a useEffect is called on the page so it can render the post data.
    -@AC: destructure it { posts: { posts(dataArray), currentPage, numberOfPages } }
    -@api: revamp the fetchPosts to get the pagenumber Dynamically
    -@controllers: since the state is taking isLoading, posts: [currentPage, numberOfPages, posts] you will have to make a const that includes all those variables when the BE sends back the data to FE.
    -@reducers:  restrutucre for good sync with the numberOfPages, posts, and currentPage.
*/