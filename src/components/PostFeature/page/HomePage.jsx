import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import postApi from '../../../api/postApi';
import PostList from '../components/PostList';
import PostSkeleton from '../components/PostSkeleton';

HomePage.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: '70px',
    },
    
    progress: {
        color: '#000',
    },
}));

function HomePage(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const collection = await postApi.getAll();
                setPostList(collection.data);
            } catch (err) {
                console.log('Failed to fetch data: ', err);
            }

            setLoading(false);
        })();
    }, []);

    return (
        <Box className={classes.root}>
            <Container className={classes.container} maxWidth="md" >

                {loading ? <PostSkeleton num={3} /> : <PostList data={postList}/> }

            </Container>
        </Box>
    );
}

export default HomePage;