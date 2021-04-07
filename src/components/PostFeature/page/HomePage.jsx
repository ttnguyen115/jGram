import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import postApi from '../../../api/postApi';
import { db } from '../../../database/firebase';
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

    // Fetch temp data from JSONPlaceholder
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

    // Fetch realtime data from Firebase officially
    useEffect(() => {
        (async () => {
            db.collection('posts').onSnapshot(snapshot => {})
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