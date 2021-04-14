import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { db } from '../../../database/firebase';
import Header from '../../Header';
import UploadPost from '../../UploadFeature/UploadPost';
import PostList from '../components/PostList';
import PostSkeleton from '../components/PostSkeleton';

HomePage.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    
    container: {
        width: '100%',
        position: 'absolute',
        margin: '70px auto',
        left: 0,
        right: 0,
    },
    
    progress: {
        color: '#000',
    },
}));

function HomePage(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);

    // const { userState } = useUserState(user);

    // Fetch realtime data from Firebase officially
    useEffect(() => {
        (async () => {
            try {
                db.collection('posts').onSnapshot(snapshot => {
                    setPostList(snapshot.docs.map(doc => ({
                        id: doc.id , 
                        post: doc.data()
                    })));
                }); 
            } catch (err) {
                console.log('Failed to fetch data: ', err);
            }

            setLoading(false);
        })();
    }, []);

    return (
        <Box className={classes.root}>
            <Header className={classes.header} />
            <UploadPost  /> 
            <Container className={classes.container} maxWidth="md">

                {loading ? <PostSkeleton /> : <PostList data={postList}/> }

            </Container>
        </Box>
    );
}

export default HomePage;