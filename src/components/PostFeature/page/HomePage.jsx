import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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
            {/* <Header userCurrent={user} />  */}
            <Container className={classes.container} maxWidth="md" >

                {loading ? <PostSkeleton /> : <PostList data={postList}/> }

            </Container>
        </Box>
    );
}

export default HomePage;