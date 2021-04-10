import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../database/firebase';
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
    const [user, setUser] = useState(null);

    // Fetch temp data from JSONPlaceholder
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const collection = await postApi.getAll();
    //             setPostList(collection.data);
    //         } catch (err) {
    //             console.log('Failed to fetch data: ', err);
    //         }

    //         setLoading(false);
    //     })();
    // }, []);

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

    // Log in or Sign up
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // If user log in
                console.log(authUser);
                setUser(authUser);

            } else {
                // If user log out
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        }
    }, [user]);

    return (
        <Box className={classes.root}>
            <Container className={classes.container} maxWidth="md" >

                {loading ? <PostSkeleton num={3} /> : <PostList data={postList}/> }

            </Container>
        </Box>
    );
}

export default HomePage;